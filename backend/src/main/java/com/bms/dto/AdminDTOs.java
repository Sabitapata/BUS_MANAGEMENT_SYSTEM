package com.bms.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDateTime;

public class AdminDTOs {

    public static class BusCreateRequest {
        @NotBlank(message = "Bus number is required")
        private String busNumber;

        @NotBlank(message = "Operator name is required")
        private String operatorName;

        @NotBlank(message = "Bus type is required")
        private String busType;

        @NotNull(message = "Capacity is required")
        @Min(value = 10, message = "Minimum capacity is 10")
        private Integer totalCapacity;

        private String amenities;

        public BusCreateRequest() {}

        public String getBusNumber() { return busNumber; }
        public void setBusNumber(String busNumber) { this.busNumber = busNumber; }
        public String getOperatorName() { return operatorName; }
        public void setOperatorName(String operatorName) { this.operatorName = operatorName; }
        public String getBusType() { return busType; }
        public void setBusType(String busType) { this.busType = busType; }
        public Integer getTotalCapacity() { return totalCapacity; }
        public void setTotalCapacity(Integer totalCapacity) { this.totalCapacity = totalCapacity; }
        public String getAmenities() { return amenities; }
        public void setAmenities(String amenities) { this.amenities = amenities; }
    }

    public static class RouteCreateRequest {
        @NotBlank(message = "Source city is required")
        private String sourceCity;

        @NotBlank(message = "Destination city is required")
        private String destinationCity;

        @NotNull(message = "Distance is required")
        @DecimalMin(value = "1.0", message = "Distance must be positive")
        private BigDecimal distanceKm;

        @NotNull(message = "Duration in minutes is required")
        @Min(value = 10, message = "Minimum duration is 10 minutes")
        private Integer durationMinutes;

        public RouteCreateRequest() {}

        public String getSourceCity() { return sourceCity; }
        public void setSourceCity(String sourceCity) { this.sourceCity = sourceCity; }
        public String getDestinationCity() { return destinationCity; }
        public void setDestinationCity(String destinationCity) { this.destinationCity = destinationCity; }
        public BigDecimal getDistanceKm() { return distanceKm; }
        public void setDistanceKm(BigDecimal distanceKm) { this.distanceKm = distanceKm; }
        public Integer getDurationMinutes() { return durationMinutes; }
        public void setDurationMinutes(Integer durationMinutes) { this.durationMinutes = durationMinutes; }
    }

    public static class TripCreateRequest {
        @NotNull(message = "Bus ID is required")
        private Long busId;

        @NotNull(message = "Route ID is required")
        private Long routeId;

        @NotNull(message = "Departure time is required")
        private LocalDateTime departureTime;

        @NotNull(message = "Arrival time is required")
        private LocalDateTime arrivalTime;

        @NotNull(message = "Base fare is required")
        @DecimalMin(value = "50.0", message = "Minimum fare is 50")
        private BigDecimal baseFare;

        public TripCreateRequest() {}

        public Long getBusId() { return busId; }
        public void setBusId(Long busId) { this.busId = busId; }
        public Long getRouteId() { return routeId; }
        public void setRouteId(Long routeId) { this.routeId = routeId; }
        public LocalDateTime getDepartureTime() { return departureTime; }
        public void setDepartureTime(LocalDateTime departureTime) { this.departureTime = departureTime; }
        public LocalDateTime getArrivalTime() { return arrivalTime; }
        public void setArrivalTime(LocalDateTime arrivalTime) { this.arrivalTime = arrivalTime; }
        public BigDecimal getBaseFare() { return baseFare; }
        public void setBaseFare(BigDecimal baseFare) { this.baseFare = baseFare; }
    }

    public static class DashboardStatsDTO {
        private long totalUsers;
        private long totalBuses;
        private long totalRoutes;
        private long totalTrips;
        private long totalBookings;
        private Double totalRevenue;

        public DashboardStatsDTO() {}
        public DashboardStatsDTO(long totalUsers, long totalBuses, long totalRoutes, long totalTrips, long totalBookings, Double totalRevenue) {
            this.totalUsers = totalUsers;
            this.totalBuses = totalBuses;
            this.totalRoutes = totalRoutes;
            this.totalTrips = totalTrips;
            this.totalBookings = totalBookings;
            this.totalRevenue = totalRevenue;
        }

        public long getTotalUsers() { return totalUsers; }
        public void setTotalUsers(long totalUsers) { this.totalUsers = totalUsers; }
        public long getTotalBuses() { return totalBuses; }
        public void setTotalBuses(long totalBuses) { this.totalBuses = totalBuses; }
        public long getTotalRoutes() { return totalRoutes; }
        public void setTotalRoutes(long totalRoutes) { this.totalRoutes = totalRoutes; }
        public long getTotalTrips() { return totalTrips; }
        public void setTotalTrips(long totalTrips) { this.totalTrips = totalTrips; }
        public long getTotalBookings() { return totalBookings; }
        public void setTotalBookings(long totalBookings) { this.totalBookings = totalBookings; }
        public Double getTotalRevenue() { return totalRevenue; }
        public void setTotalRevenue(Double totalRevenue) { this.totalRevenue = totalRevenue; }
    }
}
