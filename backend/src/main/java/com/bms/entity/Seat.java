package com.bms.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "seats")
public class Seat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "bus_id", nullable = false)
    private Bus bus;

    @Column(nullable = false, length = 10)
    private String seatNumber;

    @Column(nullable = false, length = 10)
    private String deck = "LOWER";

    @Column(nullable = false, length = 20)
    private String seatType = "SEATER";

    public Seat() {}

    public Seat(Long id, Bus bus, String seatNumber, String deck, String seatType) {
        this.id = id;
        this.bus = bus;
        this.seatNumber = seatNumber;
        this.deck = deck != null ? deck : "LOWER";
        this.seatType = seatType != null ? seatType : "SEATER";
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Bus getBus() { return bus; }
    public void setBus(Bus bus) { this.bus = bus; }

    public String getSeatNumber() { return seatNumber; }
    public void setSeatNumber(String seatNumber) { this.seatNumber = seatNumber; }

    public String getDeck() { return deck; }
    public void setDeck(String deck) { this.deck = deck; }

    public String getSeatType() { return seatType; }
    public void setSeatType(String seatType) { this.seatType = seatType; }
}
