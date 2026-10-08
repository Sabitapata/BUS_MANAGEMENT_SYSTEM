package com.bms.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 30)
    private String pnrNumber;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "trip_id", nullable = false)
    private Trip trip;

    @Column(nullable = false)
    private LocalDateTime bookingTime;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal totalAmount;

    @Column(nullable = false, length = 20)
    private String bookingStatus = "CONFIRMED";

    @Column(length = 30)
    private String paymentMethod;

    @Column(length = 60)
    private String transactionId;

    @Column(precision = 10, scale = 2)
    private BigDecimal refundAmount;

    @OneToMany(mappedBy = "booking", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.EAGER)
    private List<BookingItem> items = new ArrayList<>();

    public Booking() {}

    public Booking(Long id, String pnrNumber, User user, Trip trip, LocalDateTime bookingTime, BigDecimal totalAmount, String bookingStatus, String paymentMethod, String transactionId, BigDecimal refundAmount) {
        this.id = id;
        this.pnrNumber = pnrNumber;
        this.user = user;
        this.trip = trip;
        this.bookingTime = bookingTime != null ? bookingTime : LocalDateTime.now();
        this.totalAmount = totalAmount;
        this.bookingStatus = bookingStatus != null ? bookingStatus : "CONFIRMED";
        this.paymentMethod = paymentMethod;
        this.transactionId = transactionId;
        this.refundAmount = refundAmount;
    }

    @PrePersist
    public void prePersist() {
        if (bookingTime == null) {
            bookingTime = LocalDateTime.now();
        }
        if (bookingStatus == null) {
            bookingStatus = "CONFIRMED";
        }
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getPnrNumber() { return pnrNumber; }
    public void setPnrNumber(String pnrNumber) { this.pnrNumber = pnrNumber; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Trip getTrip() { return trip; }
    public void setTrip(Trip trip) { this.trip = trip; }

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

    public List<BookingItem> getItems() { return items; }
    public void setItems(List<BookingItem> items) { this.items = items; }
}
