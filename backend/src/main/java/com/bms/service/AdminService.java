package com.bms.service;

import com.bms.dto.AdminDTOs.*;
import com.bms.entity.*;
import com.bms.exception.BadRequestException;
import com.bms.exception.ResourceNotFoundException;
import com.bms.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
public class AdminService {

    @Autowired
    private BusRepository busRepository;

    @Autowired
    private SeatRepository seatRepository;

    @Autowired
    private RouteRepository routeRepository;

    @Autowired
    private TripRepository tripRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public Bus createBus(BusCreateRequest req) {
        if (busRepository.existsByBusNumber(req.getBusNumber().trim().toUpperCase())) {
            throw new BadRequestException("Bus number already exists: " + req.getBusNumber());
        }

        Bus bus = new Bus(
                null,
                req.getBusNumber().trim().toUpperCase(),
                req.getOperatorName().trim(),
                req.getBusType().trim().toUpperCase(),
                req.getTotalCapacity(),
                "ACTIVE",
                req.getAmenities()
        );

        Bus savedBus = busRepository.save(bus);

        // Auto-generate standard seats across Lower and Upper deck
        List<Seat> seats = new ArrayList<>();
        int half = req.getTotalCapacity() / 2;

        for (int i = 1; i <= req.getTotalCapacity(); i++) {
            String deck = (i <= half) ? "LOWER" : "UPPER";
            String prefix = (i <= half) ? "L" : "U";
            int num = (i <= half) ? i : (i - half);

            String seatType = (num % 2 == 1) ? "WINDOW" : "AISLE";
            if (req.getBusType().contains("SLEEPER")) {
                seatType = "SLEEPER";
            }

            Seat s = new Seat(null, savedBus, prefix + num, deck, seatType);
            seats.add(s);
        }

        seatRepository.saveAll(seats);
        return savedBus;
    }

    public Route createRoute(RouteCreateRequest req) {
        Route route = new Route(
                null,
                req.getSourceCity().trim(),
                req.getDestinationCity().trim(),
                req.getDistanceKm(),
                req.getDurationMinutes()
        );
        return routeRepository.save(route);
    }

    public Trip createTrip(TripCreateRequest req) {
        Bus bus = busRepository.findById(req.getBusId())
                .orElseThrow(() -> new ResourceNotFoundException("Bus not found with id: " + req.getBusId()));

        Route route = routeRepository.findById(req.getRouteId())
                .orElseThrow(() -> new ResourceNotFoundException("Route not found with id: " + req.getRouteId()));

        if (req.getArrivalTime().isBefore(req.getDepartureTime())) {
            throw new BadRequestException("Arrival time cannot be before departure time");
        }

        Trip trip = new Trip(
                null,
                bus,
                route,
                req.getDepartureTime(),
                req.getArrivalTime(),
                req.getBaseFare(),
                "SCHEDULED"
        );

        return tripRepository.save(trip);
    }

    public DashboardStatsDTO getDashboardStats() {
        long totalUsers = userRepository.count();
        long totalBuses = busRepository.count();
        long totalRoutes = routeRepository.count();
        long totalTrips = tripRepository.count();
        long totalBookings = bookingRepository.countConfirmedBookings();
        Double totalRevenue = bookingRepository.sumTotalRevenue();

        return new DashboardStatsDTO(
                totalUsers,
                totalBuses,
                totalRoutes,
                totalTrips,
                totalBookings,
                totalRevenue != null ? totalRevenue : 0.0
        );
    }

    public List<Booking> getPassengerManifestForTrip(Long tripId) {
        return bookingRepository.findConfirmedBookingsByTripId(tripId);
    }
}
