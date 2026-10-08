package com.bms.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class TripDTOs {

    public static class TripResponse {
        private Long tripId;
        private Long busId;
        private String busNumber;
        private String operatorName;
        private String busType;
        private Integer totalCapacity;
        private String amenities;

        private Long routeId;
        private String sourceCity;
        private String destinationCity;
        private BigDecimal distanceKm;
        private Integer durationMinutes;

        private LocalDateTime departureTime;
        private LocalDateTime arrivalTime;
        private BigDecimal baseFare;
        private String tripStatus;
        private int availableSeatsCount;

        public TripResponse() {}

        public Long getTripId() { return tripId; }
        public void setTripId(Long tripId) { this.tripId = tripId; }
        public Long getBusId() { return busId; }
        public void setBusId(Long busId) { this.busId = busId; }
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

        public Long getRouteId() { return routeId; }
        public void setRouteId(Long routeId) { this.routeId = routeId; }
        public String getSourceCity() { return sourceCity; }
        public void setSourceCity(String sourceCity) { this.sourceCity = sourceCity; }
        public String getDestinationCity() { return destinationCity; }
        public void setDestinationCity(String destinationCity) { this.destinationCity = destinationCity; }
        public BigDecimal getDistanceKm() { return distanceKm; }
        public void setDistanceKm(BigDecimal distanceKm) { this.distanceKm = distanceKm; }
        public Integer getDurationMinutes() { return durationMinutes; }
        public void setDurationMinutes(Integer durationMinutes) { this.durationMinutes = durationMinutes; }

        public LocalDateTime getDepartureTime() { return departureTime; }
        public void setDepartureTime(LocalDateTime departureTime) { this.departureTime = departureTime; }
        public LocalDateTime getArrivalTime() { return arrivalTime; }
        public void setArrivalTime(LocalDateTime arrivalTime) { this.arrivalTime = arrivalTime; }
        public BigDecimal getBaseFare() { return baseFare; }
        public void setBaseFare(BigDecimal baseFare) { this.baseFare = baseFare; }
        public String getTripStatus() { return tripStatus; }
        public void setTripStatus(String tripStatus) { this.tripStatus = tripStatus; }
        public int getAvailableSeatsCount() { return availableSeatsCount; }
        public void setAvailableSeatsCount(int availableSeatsCount) { this.availableSeatsCount = availableSeatsCount; }
    }

    public static class SeatDTO {
        private Long seatId;
        private String seatNumber;
        private String deck;
        private String seatType;
        private boolean isBooked;

        public SeatDTO() {}
        public SeatDTO(Long seatId, String seatNumber, String deck, String seatType, boolean isBooked) {
            this.seatId = seatId;
            this.seatNumber = seatNumber;
            this.deck = deck;
            this.seatType = seatType;
            this.isBooked = isBooked;
        }

        public Long getSeatId() { return seatId; }
        public void setSeatId(Long seatId) { this.seatId = seatId; }
        public String getSeatNumber() { return seatNumber; }
        public void setSeatNumber(String seatNumber) { this.seatNumber = seatNumber; }
        public String getDeck() { return deck; }
        public void setDeck(String deck) { this.deck = deck; }
        public String getSeatType() { return seatType; }
        public void setSeatType(String seatType) { this.seatType = seatType; }
        public boolean isBooked() { return isBooked; }
        public void setBooked(boolean booked) { isBooked = booked; }
    }

    public static class SeatMatrixResponse {
        private Long tripId;
        private String busNumber;
        private String operatorName;
        private String busType;
        private BigDecimal baseFare;
        private List<SeatDTO> lowerDeckSeats;
        private List<SeatDTO> upperDeckSeats;

        public SeatMatrixResponse() {}

        public Long getTripId() { return tripId; }
        public void setTripId(Long tripId) { this.tripId = tripId; }
        public String getBusNumber() { return busNumber; }
        public void setBusNumber(String busNumber) { this.busNumber = busNumber; }
        public String getOperatorName() { return operatorName; }
        public void setOperatorName(String operatorName) { this.operatorName = operatorName; }
        public String getBusType() { return busType; }
        public void setBusType(String busType) { this.busType = busType; }
        public BigDecimal getBaseFare() { return baseFare; }
        public void setBaseFare(BigDecimal baseFare) { this.baseFare = baseFare; }
        public List<SeatDTO> getLowerDeckSeats() { return lowerDeckSeats; }
        public void setLowerDeckSeats(List<SeatDTO> lowerDeckSeats) { this.lowerDeckSeats = lowerDeckSeats; }
        public List<SeatDTO> getUpperDeckSeats() { return upperDeckSeats; }
        public void setUpperDeckSeats(List<SeatDTO> upperDeckSeats) { this.upperDeckSeats = upperDeckSeats; }
    }
}
