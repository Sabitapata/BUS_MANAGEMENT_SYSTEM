package com.bms.repository;

import com.bms.entity.Route;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface RouteRepository extends JpaRepository<Route, Long> {
    Optional<Route> findBySourceCityIgnoreCaseAndDestinationCityIgnoreCase(String source, String destination);

    @Query("SELECT DISTINCT r.sourceCity FROM Route r ORDER BY r.sourceCity")
    List<String> findDistinctSourceCities();

    @Query("SELECT DISTINCT r.destinationCity FROM Route r ORDER BY r.destinationCity")
    List<String> findDistinctDestinationCities();
}
