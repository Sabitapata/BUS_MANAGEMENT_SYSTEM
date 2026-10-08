package com.bms.repository;

import com.bms.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    Optional<Booking> findByPnrNumber(String pnrNumber);

    List<Booking> findByUserIdOrderByBookingTimeDesc(Long userId);

    @Query("SELECT b FROM Booking b WHERE b.trip.id = :tripId AND b.bookingStatus = 'CONFIRMED'")
    List<Booking> findConfirmedBookingsByTripId(@Param("tripId") Long tripId);

    @Query("SELECT COUNT(b) FROM Booking b WHERE b.bookingStatus = 'CONFIRMED'")
    long countConfirmedBookings();

    @Query("SELECT COALESCE(SUM(b.totalAmount), 0) FROM Booking b WHERE b.bookingStatus = 'CONFIRMED'")
    Double sumTotalRevenue();
}
