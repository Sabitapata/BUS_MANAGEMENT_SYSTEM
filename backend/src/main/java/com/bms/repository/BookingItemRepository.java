package com.bms.repository;

import com.bms.entity.BookingItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BookingItemRepository extends JpaRepository<BookingItem, Long> {

    @Query("SELECT bi.seat.id FROM BookingItem bi " +
           "WHERE bi.booking.trip.id = :tripId " +
           "AND bi.booking.bookingStatus = 'CONFIRMED'")
    List<Long> findBookedSeatIdsByTripId(@Param("tripId") Long tripId);

    @Query("SELECT bi.seat.id FROM BookingItem bi " +
           "WHERE bi.booking.trip.id = :tripId " +
           "AND bi.booking.bookingStatus = 'CONFIRMED' " +
           "AND bi.seat.id IN :seatIds")
    List<Long> findConflictingSeatIds(@Param("tripId") Long tripId, @Param("seatIds") List<Long> seatIds);
}
