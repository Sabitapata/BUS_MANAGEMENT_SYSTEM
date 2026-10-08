package com.bms.repository;

import com.bms.entity.Bus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface BusRepository extends JpaRepository<Bus, Long> {
    Optional<Bus> findByBusNumber(String busNumber);
    boolean existsByBusNumber(String busNumber);
}
