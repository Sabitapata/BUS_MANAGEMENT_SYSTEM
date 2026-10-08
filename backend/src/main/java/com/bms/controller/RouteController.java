package com.bms.controller;

import com.bms.entity.Route;
import com.bms.repository.RouteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/routes")
public class RouteController {

    @Autowired
    private RouteRepository routeRepository;

    @GetMapping
    public ResponseEntity<List<Route>> getAllRoutes() {
        return ResponseEntity.ok(routeRepository.findAll());
    }

    @GetMapping("/cities")
    public ResponseEntity<Map<String, List<String>>> getAvailableCities() {
        Map<String, List<String>> result = new HashMap<>();
        result.put("sourceCities", routeRepository.findDistinctSourceCities());
        result.put("destinationCities", routeRepository.findDistinctDestinationCities());
        return ResponseEntity.ok(result);
    }
}
