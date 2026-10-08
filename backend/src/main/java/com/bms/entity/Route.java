package com.bms.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "routes")
public class Route {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String sourceCity;

    @Column(nullable = false, length = 100)
    private String destinationCity;

    @Column(nullable = false, precision = 6, scale = 2)
    private BigDecimal distanceKm;

    @Column(nullable = false)
    private Integer durationMinutes;

    public Route() {}

    public Route(Long id, String sourceCity, String destinationCity, BigDecimal distanceKm, Integer durationMinutes) {
        this.id = id;
        this.sourceCity = sourceCity;
        this.destinationCity = destinationCity;
        this.distanceKm = distanceKm;
        this.durationMinutes = durationMinutes;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getSourceCity() { return sourceCity; }
    public void setSourceCity(String sourceCity) { this.sourceCity = sourceCity; }

    public String getDestinationCity() { return destinationCity; }
    public void setDestinationCity(String destinationCity) { this.destinationCity = destinationCity; }

    public BigDecimal getDistanceKm() { return distanceKm; }
    public void setDistanceKm(BigDecimal distanceKm) { this.distanceKm = distanceKm; }

    public Integer getDurationMinutes() { return durationMinutes; }
    public void setDurationMinutes(Integer durationMinutes) { this.durationMinutes = durationMinutes; }
}
