package com.bms.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

public class BookingDTOs {

    public static class PassengerDTO {
        @NotNull(message = "Seat ID is required")
        private Long seatId;

        @NotEmpty(message = "Passenger name is required")
        private String passengerName;

        @NotNull(message = "Passenger age is required")
        private Integer passengerAge;

        @NotEmpty(message = "Passenger gender is required")
        private String passengerGender;

        public PassengerDTO() {}
        public PassengerDTO(Long seatId, String passengerName, Integer passengerAge, String passengerGender) {
            this.seatId = seatId;
            this.passengerName = passengerName;
            this.passengerAge = passengerAge;
            this.passengerGender = passengerGender;
        }

        public Long getSeatId() { return seatId; }
        public void setSeatId(Long seatId) { this.seatId = seatId; }
        public String getPassengerName() { return passengerName; }
        public void setPassengerName(String passengerName) { this.passengerName = passengerName; }
        public Integer getPassengerAge() { return passengerAge; }
        public void setPassengerAge(Integer passengerAge) { this.passengerAge = passengerAge; }
        public String getPassengerGender() { return passengerGender; }
        public void setPassengerGender(String passengerGender) { this.passengerGender = passengerGender; }
    }

    public static class BookingRequest {
        @NotNull(message = "Trip ID is required")
        private Long tripId;

        @NotEmpty(message = "At least one passenger must be selected")
        private List<PassengerDTO> passengers;

        private String paymentMethod;

        public BookingRequest() {}
        public BookingRequest(Long tripId, List<PassengerDTO> passengers, String paymentMethod) {
            this.tripId = tripId;
            this.passengers = passengers;
            this.paymentMethod = paymentMethod;
        }

        public Long getTripId() { return tripId; }
        public void setTripId(Long tripId) { this.tripId = tripId; }
        public List<PassengerDTO> getPassengers() { return passengers; }
        public void setPassengers(List<PassengerDTO> passengers) { this.passengers = passengers; }
        public String getPaymentMethod() { return paymentMethod; }
        public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }
    }

    public static class BookingItemResponse {
        private Long itemId;
        private Long seatId;
        private String seatNumber;
        private String deck;
        private String passengerName;
        private Integer passengerAge;
        private String passengerGender;

        public BookingItemResponse() {}

        public Long getItemId() { return itemId; }
        public void setItemId(Long itemId) { this.itemId = itemId; }
        public Long getSeatId() { return seatId; }
        public void setSeatId(Long seatId) { this.seatId = seatId; }
        public String getSeatNumber() { return seatNumber; }
        public void setSeatNumber(String seatNumber) { this.seatNumber = seatNumber; }
        public String getDeck() { return deck; }
        public void setDeck(String deck) { this.deck = deck; }
        public String getPassengerName() { return passengerName; }
        public void setPassengerName(String passengerName) { this.passengerName = passengerName; }
        public Integer getPassengerAge() { return passengerAge; }
        public void setPassengerAge(Integer passengerAge) { this.passengerAge = passengerAge; }
        public String getPassengerGender() { return passengerGender; }
        public void setPassengerGender(String passengerGender) { this.passengerGender = passengerGender; }
    }

    public static class BookingResponse {
        private Long bookingId;
        private String pnrNumber;
        private Long tripId;
        private String busNumber;
        private String operatorName;
        private String busType;
        private String sourceCity;
        private String destinationCity;
        private LocalDateTime departureTime;
        private LocalDateTime arrivalTime;
        private LocalDateTime bookingTime;
        private BigDecimal totalAmount;
        private String bookingStatus;
        private String paymentMethod;
        private String transactionId;
        private BigDecimal refundAmount;
        private List<BookingItemResponse> items;

        public BookingResponse() {}

        public Long getBookingId() { return bookingId; }
        public void setBookingId(Long bookingId) { this.bookingId = bookingId; }
        public String getPnrNumber() { return pnrNumber; }
        public void setPnrNumber(String pnrNumber) { this.pnrNumber = pnrNumber; }
        public Long getTripId() { return tripId; }
        public void setTripId(Long tripId) { this.tripId = tripId; }
        public String getBusNumber() { return busNumber; }
        public void setBusNumber(String busNumber) { this.busNumber = busNumber; }
        public String getOperatorName() { return operatorName; }
        public void setOperatorName(String operatorName) { this.operatorName = operatorName; }
        public String getBusType() { return busType; }
        public void setBusType(String busType) { this.busType = busType; }
        public String getSourceCity() { return sourceCity; }
        public void setSourceCity(String sourceCity) { this.sourceCity = sourceCity; }
        public String getDestinationCity() { return destinationCity; }
        public void setDestinationCity(String destinationCity) { this.destinationCity = destinationCity; }
        public LocalDateTime getDepartureTime() { return departureTime; }
        public void setDepartureTime(LocalDateTime departureTime) { this.departureTime = departureTime; }
        public LocalDateTime getArrivalTime() { return arrivalTime; }
        public void setArrivalTime(LocalDateTime arrivalTime) { this.arrivalTime = arrivalTime; }
        public LocalDateTime getBookingTime() { return bookingTime; }
        public void setBookingTime(LocalDateTime bookingTime) { this.bookingTime = bookingTime; }
        public BigDecimal getTotalAmount() { return totalAmount; }
        public void setTotalAmount(BigDecimal totalAmount) { this.totalAmount = totalAmount; }
        public String getBookingStatus() { return bookingStatus; }
        public void setBookingStatus(String bookingStatus) { this.bookingStatus = bookingStatus; }
        public String getPaymentMethod() { return paymentMethod; }
        public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }
        public String getTransactionId() { return transactionId; }
        public void setTransactionId(String transactionId) { this.transactionId = transactionId; }
        public BigDecimal getRefundAmount() { return refundAmount; }
        public void setRefundAmount(BigDecimal refundAmount) { this.refundAmount = refundAmount; }
        public List<BookingItemResponse> getItems() { return items; }
        public void setItems(List<BookingItemResponse> items) { this.items = items; }
    }
}
