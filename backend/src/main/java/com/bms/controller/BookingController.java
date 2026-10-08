package com.bms.controller;

import com.bms.dto.BookingDTOs.*;
import com.bms.entity.User;
import com.bms.service.AuthService;
import com.bms.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @Autowired
    private AuthService authService;

    @PostMapping
    public ResponseEntity<BookingResponse> createBooking(@Valid @RequestBody BookingRequest request) {
        User currentUser = authService.getAuthenticatedUser();
        return ResponseEntity.status(HttpStatus.CREATED).body(bookingService.createBooking(request, currentUser));
    }

    @GetMapping("/my")
    public ResponseEntity<List<BookingResponse>> getMyBookings() {
        User currentUser = authService.getAuthenticatedUser();
        return ResponseEntity.ok(bookingService.getUserBookings(currentUser.getId()));
    }

    @GetMapping("/pnr/{pnr}")
    public ResponseEntity<BookingResponse> getBookingByPnr(@PathVariable String pnr) {
        return ResponseEntity.ok(bookingService.getBookingByPnr(pnr));
    }

    @PutMapping("/{bookingId}/cancel")
    public ResponseEntity<BookingResponse> cancelBooking(@PathVariable Long bookingId) {
        User currentUser = authService.getAuthenticatedUser();
        return ResponseEntity.ok(bookingService.cancelBooking(bookingId, currentUser));
    }
}
