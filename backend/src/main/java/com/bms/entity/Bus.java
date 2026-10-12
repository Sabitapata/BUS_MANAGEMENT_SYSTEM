package com.bms.entity;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "buses")
public class Bus {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 30)
    private String busNumber;

    @Column(nullable = false, length = 100)
    private String operatorName;

    @Column(nullable = false, length = 30)
    private String busType;

    @Column(nullable = false)
    private Integer totalCapacity;

    @Column(nullable = false, length = 20)
    private String status = "ACTIVE";

    @Column(length = 255)
    private String amenities;

    @OneToMany(mappedBy = "bus", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Seat> seats = new ArrayList<>();

    public Bus() {}

    public Bus(Long id, String busNumber, String operatorName, String busType, Integer totalCapacity, String status, String amenities) {
        this.id = id;
        this.busNumber = busNumber;
        this.operatorName = operatorName;
        this.busType = busType;
        this.totalCapacity = totalCapacity;
        this.status = status != null ? status : "ACTIVE";
        this.amenities = amenities;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getBusNumber() { return busNumber; }
    public void setBusNumber(String busNumber) { this.busNumber = busNumber; }

    public String getOperatorName() { return operatorName; }
    public void setOperatorName(String operatorName) { this.operatorName = operatorName; }

    public String getBusType() { return busType; }
    public void setBusType(String busType) { this.busType = busType; }

    public Integer getTotalCapacity() { return totalCapacity; }
    public void setTotalCapacity(Integer totalCapacity) { this.totalCapacity = totalCapacity; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getAmenities() { return amenities; }
    public void setAmenities(String amenities) { this.amenities = amenities; }

    public List<Seat> getSeats() { return seats; }
    public void setSeats(List<Seat> seats) { this.seats = seats; }
}
