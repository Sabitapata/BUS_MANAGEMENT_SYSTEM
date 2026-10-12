package com.bms.repository;

import com.bms.entity.Trip;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface TripRepository extends JpaRepository<Trip, Long> {

    @Query("SELECT t FROM Trip t WHERE LOWER(t.route.sourceCity) = LOWER(:source) " +
           "AND LOWER(t.route.destinationCity) = LOWER(:destination) " +
           "AND t.departureTime BETWEEN :startTime AND :endTime " +
           "AND t.tripStatus = 'SCHEDULED' ORDER BY t.departureTime ASC")
    List<Trip> searchTrips(
            @Param("source") String source,
            @Param("destination") String destination,
            @Param("startTime") LocalDateTime startTime,
            @Param("endTime") LocalDateTime endTime
    );

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT t FROM Trip t WHERE t.id = :id")
    Optional<Trip> findByIdWithLock(@Param("id") Long id);

    List<Trip> findByTripStatusOrderByDepartureTimeDesc(String status);
}
