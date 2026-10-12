package com.bms.service;

import com.bms.dto.TripDTOs.*;
import com.bms.entity.Seat;
import com.bms.entity.Trip;
import com.bms.exception.ResourceNotFoundException;
import com.bms.repository.BookingItemRepository;
import com.bms.repository.SeatRepository;
import com.bms.repository.TripRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class TripService {

    @Autowired
    private TripRepository tripRepository;

    @Autowired
    private SeatRepository seatRepository;

    @Autowired
    private BookingItemRepository bookingItemRepository;

    public List<TripResponse> searchTrips(String source, String destination, LocalDate travelDate) {
        LocalDateTime startOfDay = travelDate.atStartOfDay();
        LocalDateTime endOfDay = travelDate.atTime(LocalTime.MAX);

        List<Trip> trips = tripRepository.searchTrips(source.trim(), destination.trim(), startOfDay, endOfDay);

        return trips.stream().map(this::mapTripToResponse).collect(Collectors.toList());
    }

    public List<TripResponse> getAllUpcomingTrips() {
        return tripRepository.findByTripStatusOrderByDepartureTimeDesc("SCHEDULED").stream()
                .map(this::mapTripToResponse)
                .collect(Collectors.toList());
    }

    public SeatMatrixResponse getSeatMatrix(Long tripId) {
        Trip trip = tripRepository.findById(tripId)
                .orElseThrow(() -> new ResourceNotFoundException("Trip not found with id: " + tripId));

        List<Seat> seats = seatRepository.findByBusIdOrderBySeatNumberAsc(trip.getBus().getId());
        List<Long> bookedSeatIds = bookingItemRepository.findBookedSeatIdsByTripId(tripId);

        List<SeatDTO> lowerDeck = new ArrayList<>();
        List<SeatDTO> upperDeck = new ArrayList<>();

        for (Seat seat : seats) {
            boolean isBooked = bookedSeatIds.contains(seat.getId());
            SeatDTO dto = new SeatDTO(
                    seat.getId(),
                    seat.getSeatNumber(),
                    seat.getDeck(),
                    seat.getSeatType(),
                    isBooked
            );

            if ("UPPER".equalsIgnoreCase(seat.getDeck())) {
                upperDeck.add(dto);
            } else {
                lowerDeck.add(dto);
            }
        }

        SeatMatrixResponse response = new SeatMatrixResponse();
        response.setTripId(trip.getId());
        response.setBusNumber(trip.getBus().getBusNumber());
        response.setOperatorName(trip.getBus().getOperatorName());
        response.setBusType(trip.getBus().getBusType());
        response.setBaseFare(trip.getBaseFare());
        response.setLowerDeckSeats(lowerDeck);
        response.setUpperDeckSeats(upperDeck);
        return response;
    }

    private TripResponse mapTripToResponse(Trip trip) {
        List<Long> bookedSeatIds = bookingItemRepository.findBookedSeatIdsByTripId(trip.getId());
        int totalSeats = trip.getBus().getTotalCapacity();
        int availableSeats = Math.max(0, totalSeats - bookedSeatIds.size());

        TripResponse res = new TripResponse();
        res.setTripId(trip.getId());
        res.setBusId(trip.getBus().getId());
        res.setBusNumber(trip.getBus().getBusNumber());
        res.setOperatorName(trip.getBus().getOperatorName());
        res.setBusType(trip.getBus().getBusType());
        res.setTotalCapacity(totalSeats);
        res.setAmenities(trip.getBus().getAmenities());

        res.setRouteId(trip.getRoute().getId());
        res.setSourceCity(trip.getRoute().getSourceCity());
        res.setDestinationCity(trip.getRoute().getDestinationCity());
        res.setDistanceKm(trip.getRoute().getDistanceKm());
        res.setDurationMinutes(trip.getRoute().getDurationMinutes());

        res.setDepartureTime(trip.getDepartureTime());
        res.setArrivalTime(trip.getArrivalTime());
        res.setBaseFare(trip.getBaseFare());
        res.setTripStatus(trip.getTripStatus());
        res.setAvailableSeatsCount(availableSeats);
        return res;
    }
}
