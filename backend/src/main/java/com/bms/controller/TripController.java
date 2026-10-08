package com.bms.controller;

import com.bms.dto.TripDTOs.*;
import com.bms.service.TripService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/trips")
public class TripController {

    @Autowired
    private TripService tripService;

    @GetMapping("/search")
    public ResponseEntity<List<TripResponse>> searchTrips(
            @RequestParam String source,
            @RequestParam String destination,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate date
    ) {
        return ResponseEntity.ok(tripService.searchTrips(source, destination, date));
    }

    @GetMapping
    public ResponseEntity<List<TripResponse>> getAllTrips() {
        return ResponseEntity.ok(tripService.getAllUpcomingTrips());
    }

    @GetMapping("/{tripId}/seats")
    public ResponseEntity<SeatMatrixResponse> getSeatMatrix(@PathVariable Long tripId) {
        return ResponseEntity.ok(tripService.getSeatMatrix(tripId));
    }
}
