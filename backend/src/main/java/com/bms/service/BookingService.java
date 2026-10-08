package com.bms.service;

import com.bms.dto.BookingDTOs.*;
import com.bms.entity.*;
import com.bms.exception.BadRequestException;
import com.bms.exception.ResourceNotFoundException;
import com.bms.exception.SeatAlreadyBookedException;
import com.bms.repository.BookingItemRepository;
import com.bms.repository.BookingRepository;
import com.bms.repository.SeatRepository;
import com.bms.repository.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private BookingItemRepository bookingItemRepository;

    @Autowired
    private TripRepository tripRepository;

    @Autowired
    private SeatRepository seatRepository;

    @Transactional(isolation = Isolation.READ_COMMITTED)
    public BookingResponse createBooking(BookingRequest request, User currentUser) {
        if (request.getPassengers() == null || request.getPassengers().isEmpty()) {
            throw new BadRequestException("At least one seat/passenger must be selected");
        }

        // 1. Lock the trip to ensure serializable-like seat allocation
        Trip trip = tripRepository.findByIdWithLock(request.getTripId())
                .orElseThrow(() -> new ResourceNotFoundException("Trip not found with id: " + request.getTripId()));

        if (!"SCHEDULED".equalsIgnoreCase(trip.getTripStatus())) {
            throw new BadRequestException("Trip is not currently open for bookings");
        }

        List<Long> requestedSeatIds = request.getPassengers().stream()
                .map(PassengerDTO::getSeatId)
                .collect(Collectors.toList());

        // 2. Concurrency Conflict Check
        List<Long> alreadyBookedIds = bookingItemRepository.findConflictingSeatIds(trip.getId(), requestedSeatIds);
        if (!alreadyBookedIds.isEmpty()) {
            throw new SeatAlreadyBookedException("Seats " + alreadyBookedIds + " were just booked by another user. Please choose different seats.");
        }

        // 3. Calculate fare: (baseFare * count) + 5% GST
        BigDecimal baseFare = trip.getBaseFare();
        BigDecimal seatCount = BigDecimal.valueOf(requestedSeatIds.size());
        BigDecimal subTotal = baseFare.multiply(seatCount);
        BigDecimal gstAmount = subTotal.multiply(BigDecimal.valueOf(0.05));
        BigDecimal grandTotal = subTotal.add(gstAmount).setScale(2, RoundingMode.HALF_UP);

        // 4. Generate unique PNR
        String pnr = "BMS-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
        String paymentMethod = (request.getPaymentMethod() != null) ? request.getPaymentMethod().toUpperCase() : "UPI";
        String transactionId = "TXN-" + System.currentTimeMillis();

        Booking booking = new Booking();
        booking.setPnrNumber(pnr);
        booking.setUser(currentUser);
        booking.setTrip(trip);
        booking.setBookingTime(LocalDateTime.now());
        booking.setTotalAmount(grandTotal);
        booking.setBookingStatus("CONFIRMED");
        booking.setPaymentMethod(paymentMethod);
        booking.setTransactionId(transactionId);

        List<BookingItem> items = new ArrayList<>();
        for (PassengerDTO p : request.getPassengers()) {
            Seat seat = seatRepository.findById(p.getSeatId())
                    .orElseThrow(() -> new ResourceNotFoundException("Seat not found with id: " + p.getSeatId()));

            BookingItem item = new BookingItem();
            item.setBooking(booking);
            item.setSeat(seat);
            item.setPassengerName(p.getPassengerName().trim());
            item.setPassengerAge(p.getPassengerAge());
            item.setPassengerGender(p.getPassengerGender().trim().toUpperCase());
            items.add(item);
        }

        booking.setItems(items);
        Booking saved = bookingRepository.save(booking);

        return mapToResponse(saved);
    }

    public List<BookingResponse> getUserBookings(Long userId) {
        return bookingRepository.findByUserIdOrderByBookingTimeDesc(userId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public BookingResponse getBookingByPnr(String pnr) {
        Booking booking = bookingRepository.findByPnrNumber(pnr.trim().toUpperCase())
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found for PNR: " + pnr));
        return mapToResponse(booking);
    }

    @Transactional
    public BookingResponse cancelBooking(Long bookingId, User currentUser) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with id: " + bookingId));

        if (!booking.getUser().getId().equals(currentUser.getId()) &&
            !currentUser.getRole().name().equals("ROLE_ADMIN")) {
            throw new BadRequestException("You do not have permission to cancel this booking");
        }

        if ("CANCELLED".equalsIgnoreCase(booking.getBookingStatus())) {
            throw new BadRequestException("Booking is already cancelled");
        }

        LocalDateTime now = LocalDateTime.now();
        LocalDateTime departure = booking.getTrip().getDepartureTime();

        if (now.isAfter(departure)) {
            throw new BadRequestException("Cannot cancel booking after bus has departed");
        }

        long hoursUntilDeparture = Duration.between(now, departure).toHours();
        BigDecimal refundAmount;
        if (hoursUntilDeparture >= 24) {
            refundAmount = booking.getTotalAmount().multiply(BigDecimal.valueOf(0.90));
        } else if (hoursUntilDeparture >= 12) {
            refundAmount = booking.getTotalAmount().multiply(BigDecimal.valueOf(0.50));
        } else {
            refundAmount = BigDecimal.ZERO;
        }

        booking.setBookingStatus("CANCELLED");
        booking.setRefundAmount(refundAmount.setScale(2, RoundingMode.HALF_UP));

        Booking updated = bookingRepository.save(booking);
        return mapToResponse(updated);
    }

    private BookingResponse mapToResponse(Booking b) {
        List<BookingItemResponse> itemResponses = b.getItems().stream().map(i -> {
            BookingItemResponse bir = new BookingItemResponse();
            bir.setItemId(i.getId());
            bir.setSeatId(i.getSeat().getId());
            bir.setSeatNumber(i.getSeat().getSeatNumber());
            bir.setDeck(i.getSeat().getDeck());
            bir.setPassengerName(i.getPassengerName());
            bir.setPassengerAge(i.getPassengerAge());
            bir.setPassengerGender(i.getPassengerGender());
            return bir;
        }).collect(Collectors.toList());

        BookingResponse res = new BookingResponse();
        res.setBookingId(b.getId());
        res.setPnrNumber(b.getPnrNumber());
        res.setTripId(b.getTrip().getId());
        res.setBusNumber(b.getTrip().getBus().getBusNumber());
        res.setOperatorName(b.getTrip().getBus().getOperatorName());
        res.setBusType(b.getTrip().getBus().getBusType());
        res.setSourceCity(b.getTrip().getRoute().getSourceCity());
        res.setDestinationCity(b.getTrip().getRoute().getDestinationCity());
        res.setDepartureTime(b.getTrip().getDepartureTime());
        res.setArrivalTime(b.getTrip().getArrivalTime());
        res.setBookingTime(b.getBookingTime());
        res.setTotalAmount(b.getTotalAmount());
        res.setBookingStatus(b.getBookingStatus());
        res.setPaymentMethod(b.getPaymentMethod());
        res.setTransactionId(b.getTransactionId());
        res.setRefundAmount(b.getRefundAmount());
        res.setItems(itemResponses);
        return res;
    }
}
