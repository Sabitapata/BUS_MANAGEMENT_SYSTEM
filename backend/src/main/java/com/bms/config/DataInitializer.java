package com.bms.config;

import com.bms.entity.*;
import com.bms.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BusRepository busRepository;

    @Autowired
    private SeatRepository seatRepository;

    @Autowired
    private RouteRepository routeRepository;

    @Autowired
    private TripRepository tripRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.count() > 0) {
            return; // Already initialized
        }

        // 1. Seed Users
        User admin = new User(
                null,
                "System Administrator",
                "admin@bms.com",
                passwordEncoder.encode("Admin@123"),
                "9876543210",
                Role.ROLE_ADMIN,
                LocalDateTime.now()
        );
        userRepository.save(admin);

        User passenger = new User(
                null,
                "Rahul Sharma",
                "passenger@example.com",
                passwordEncoder.encode("User@123"),
                "9123456780",
                Role.ROLE_USER,
                LocalDateTime.now()
        );
        userRepository.save(passenger);

        // 2. Seed Buses & Seats
        Bus bus1 = createBusWithSeats("MH-01-AB-1001", "Purple Travels", "AC_SLEEPER", 30, "WiFi, Charging, Blanket, Water");
        Bus bus2 = createBusWithSeats("MH-12-CD-2002", "Neeta Tours & Travels", "VOLVO_MULTI_AXLE", 40, "AC, Pushback Seats, USB, Entertainment");
        Bus bus3 = createBusWithSeats("MH-04-EF-3003", "Shivneri Express (MSRTC)", "NON_AC_SEATER", 36, "Reading Light, Fan, Emergency Exit");

        // 3. Seed Routes
        Route r1 = new Route(null, "Mumbai", "Pune", BigDecimal.valueOf(150.0), 190);
        Route r2 = new Route(null, "Pune", "Mumbai", BigDecimal.valueOf(150.0), 190);
        Route r3 = new Route(null, "Mumbai", "Goa", BigDecimal.valueOf(580.0), 660);
        Route r4 = new Route(null, "Mumbai", "Nashik", BigDecimal.valueOf(165.0), 210);
        routeRepository.saveAll(List.of(r1, r2, r3, r4));

        // 4. Seed Trips (Generate trips for today and the next 7 days)
        LocalDate today = LocalDate.now();
        List<Trip> trips = new ArrayList<>();

        for (int dayOffset = 0; dayOffset <= 7; dayOffset++) {
            LocalDate tripDate = today.plusDays(dayOffset);

            // Morning Trip: Mumbai -> Pune
            trips.add(new Trip(
                    null,
                    bus2,
                    r1,
                    LocalDateTime.of(tripDate, LocalTime.of(7, 30)),
                    LocalDateTime.of(tripDate, LocalTime.of(10, 40)),
                    BigDecimal.valueOf(450.00),
                    "SCHEDULED"
            ));

            // Afternoon Trip: Mumbai -> Pune
            trips.add(new Trip(
                    null,
                    bus3,
                    r1,
                    LocalDateTime.of(tripDate, LocalTime.of(14, 0)),
                    LocalDateTime.of(tripDate, LocalTime.of(17, 30)),
                    BigDecimal.valueOf(320.00),
                    "SCHEDULED"
            ));

            // Night Sleeper: Mumbai -> Goa
            trips.add(new Trip(
                    null,
                    bus1,
                    r3,
                    LocalDateTime.of(tripDate, LocalTime.of(21, 0)),
                    LocalDateTime.of(tripDate.plusDays(1), LocalTime.of(8, 0)),
                    BigDecimal.valueOf(1150.00),
                    "SCHEDULED"
            ));

            // Evening: Mumbai -> Nashik
            trips.add(new Trip(
                    null,
                    bus2,
                    r4,
                    LocalDateTime.of(tripDate, LocalTime.of(17, 30)),
                    LocalDateTime.of(tripDate, LocalTime.of(21, 0)),
                    BigDecimal.valueOf(420.00),
                    "SCHEDULED"
            ));
        }

        tripRepository.saveAll(trips);
        System.out.println(">>> [BMS DataInitializer] Successfully seeded initial Users, Buses, Routes, and 30+ Trips!");
    }

    private Bus createBusWithSeats(String busNumber, String operator, String type, int capacity, String amenities) {
        Bus bus = new Bus(null, busNumber, operator, type, capacity, "ACTIVE", amenities);
        Bus savedBus = busRepository.save(bus);

        List<Seat> seats = new ArrayList<>();
        int half = capacity / 2;

        for (int i = 1; i <= capacity; i++) {
            String deck = (i <= half) ? "LOWER" : "UPPER";
            String prefix = (i <= half) ? "L" : "U";
            int num = (i <= half) ? i : (i - half);
            String seatType = (num % 2 == 1) ? "WINDOW" : "AISLE";
            if (type.contains("SLEEPER")) {
                seatType = "SLEEPER";
            }

            Seat seat = new Seat(null, savedBus, prefix + num, deck, seatType);
            seats.add(seat);
        }

        seatRepository.saveAll(seats);
        return savedBus;
    }
}
