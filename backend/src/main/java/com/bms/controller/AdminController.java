package com.bms.controller;

import com.bms.dto.AdminDTOs.*;
import com.bms.entity.Booking;
import com.bms.entity.Bus;
import com.bms.entity.Route;
import com.bms.entity.Trip;
import com.bms.service.AdminService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasRole('ADMIN')")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/buses")
    public ResponseEntity<Bus> createBus(@Valid @RequestBody BusCreateRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(adminService.createBus(request));
    }

    @PostMapping("/routes")
    public ResponseEntity<Route> createRoute(@Valid @RequestBody RouteCreateRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(adminService.createRoute(request));
    }

    @PostMapping("/trips")
    public ResponseEntity<Trip> createTrip(@Valid @RequestBody TripCreateRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(adminService.createTrip(request));
    }

    @GetMapping("/stats")
    public ResponseEntity<DashboardStatsDTO> getDashboardStats() {
        return ResponseEntity.ok(adminService.getDashboardStats());
    }

    @GetMapping("/trips/{tripId}/manifest")
    public ResponseEntity<List<Booking>> getPassengerManifest(@PathVariable Long tripId) {
        return ResponseEntity.ok(adminService.getPassengerManifestForTrip(tripId));
    }
}
