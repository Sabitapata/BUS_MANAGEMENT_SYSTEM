# 🚌 Full-Stack Bus Management & Reservation System (BMS)

[![Java](https://img.shields.io/badge/Java-17%2B-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white)](https://www.oracle.com/java/)
[![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.x-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white)](https://spring.io/projects/spring-boot)
[![React](https://img.shields.io/badge/React-18-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![MySQL](https://img.shields.io/badge/MySQL-8.0-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![JWT](https://img.shields.io/badge/JWT-Stateless_Auth-black?style=for-the-badge&logo=JSON%20web%20tokens)](https://jwt.io/)

> An enterprise-grade, full-stack bus ticket reservation and fleet administration web platform built using **Spring Boot 3 (REST API)**, **React.js (SPA)**, and **MySQL (3NF Relational Schema)**.  
> Designed following the **University of Mumbai Engineering NEP 2020 curriculum** (*Courses: 2173611 - Full Stack Java, 2174112 - DBMS, 2174411 - Mini Project-I*).

---

## 📋 Table of Contents
- [✨ Key Features](#-key-features)
- [🏛️ System Architecture](#️-system-architecture)
- [🛠️ Tech Stack](#️-tech-stack)
- [📁 Project Folder Structure](#-project-folder-structure)
- [⚙️ Prerequisites & Environment](#️-prerequisites--environment)
- [🚀 Quick Start Guide](#-quick-start-guide)
  - [1. Database Configuration](#1-database-configuration)
  - [2. Backend Setup (Spring Boot)](#2-backend-setup-spring-boot)
  - [3. Frontend Setup (React.js)](#3-frontend-setup-reactjs)
- [📡 API Endpoints Specification](#-api-endpoints-specification)
- [🔒 Concurrency & Anti-Double-Booking Strategy](#-concurrency--anti-double-booking-strategy)
- [🧪 Testing & Sample Seed Data](#-testing--sample-seed-data)
- [📜 License & Academic Attribution](#-license--academic-attribution)

---

## ✨ Key Features

### 👤 Passenger / Customer Portal
- **Smart Bus Search:** Filter buses by Source, Destination, and Travel Date with instant autocomplete.
- **Dynamic Filters & Sorting:** Filter by Bus Category (`AC Sleeper`, `Non-AC Seater`, `Volvo Multi-Axle`), Operator, Departure Time, and Fare price range.
- **Interactive 2D Seat Matrix:** Visual layout of Lower and Upper decks. Real-time visual seat states:
  - 🟢 **Available**
  - 🔵 **Selected**
  - 🔴/🔘 **Booked (Disabled)**
  - 🟣 **Reserved for Women**
- **Dynamic Pricing & Tax Calculation:** Live calculation of Base Fare + 5% GST - Promotional Discounts.
- **Boarding & Dropping Point Selection:** Choose exact pickup/drop stops with ETA schedule.
- **Mock Payment Gateway:** Interactive payment simulation supporting UPI (QR / VPA), Credit/Debit Card, and Net Banking.
- **Instant E-Ticket & PNR:** Generates unique PNR (e.g., `BMS-84920`) with printable/downloadable PDF ticket containing trip info and QR code.
- **Cancellation & Automated Refund:** One-click ticket cancellation with automated refund slab calculation (`>24h`: 90%, `12-24h`: 50%, `<12h`: 0%) and instant release of seats.
- **My Bookings Dashboard:** View Upcoming, Past, and Cancelled trips with invoice re-downloading.

### 🛡️ Fleet Administration Portal
- **Bus Fleet Management:** Complete CRUD operations for buses (Registration Number, Operator, Type, Capacity, Deck layout, Amenities).
- **Route & Stop Management:** Define origin, destination, distance (km), estimated duration, and milestone intermediate stops.
- **Trip Dispatcher:** Schedule daily or recurring journeys linking Bus + Route + Driver + Departure/Arrival Datetime + Base Fare.
- **Passenger Manifest / Roster:** Download passenger boarding lists for drivers/conductors with contact numbers and seat assignments.
- **Maintenance Lock:** Mark buses as "Under Maintenance" to prevent scheduling.
- **Analytics & Revenue Dashboard:** Visual metrics tracking Total Revenue, Occupancy Rate (%), Peak Route Corridors, and Daily Bookings.

---

## 🏛️ System Architecture

The application adopts a decoupled **Three-Tier Layered Architecture**:

```
 ┌─────────────────────────────────────────────────────────────┐
 │                Client Tier: React.js (SPA)                  │
 │    Vite + React Router + Context API + Axios + Tailwind     │
 └──────────────────────────────┬──────────────────────────────┘
                                │ JSON via HTTP/HTTPS
                                │ Authorization: Bearer <JWT>
 ┌──────────────────────────────▼──────────────────────────────┐
 │             Application Tier: Spring Boot 3.x               │
 │                                                             │
 │   ┌─────────────────┐   ┌───────────────────────────────┐   │
 │   │ Security Filter │──►│ Controllers (@RestController) │   │
 │   └─────────────────┘   └───────────────┬───────────────┘   │
 │                                         │                   │
 │                         ┌───────────────▼───────────────┐   │
 │                         │ Business Services (@Service)  │   │
 │                         │   @Transactional + Locks      │   │
 │                         └───────────────┬───────────────┘   │
 │                                         │                   │
 │                         ┌───────────────▼───────────────┐   │
 │                         │ Spring Data JPA Repositories  │   │
 │                         └───────────────┬───────────────┘   │
 └─────────────────────────────────────────┼───────────────────┘
                                           │ JDBC / SQL
 ┌─────────────────────────────────────────▼───────────────────┐
 │               Data Tier: MySQL 8.0 Relational DB            │
 │     3NF Normalized Schema | Foreign Keys | Unique Indexes   │
 └─────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

| Layer | Technologies Used |
|---|---|
| **Frontend** | React 18, Vite, React Router v6, Tailwind CSS, Axios, Lucide Icons, jsPDF |
| **Backend** | Java 17 / 21, Spring Boot 3.2+, Spring Data JPA, Spring Security, Hibernate |
| **Authentication** | Stateless JWT (`jjwt 0.11.5`), BCrypt Password Encryption |
| **Database** | MySQL 8.0 (Compatible with PostgreSQL) |
| **Build Tools** | Maven (Backend), npm / Vite (Frontend) |
| **API Docs & Testing** | Springdoc OpenAPI (Swagger 3.0), Postman, JUnit 5 |

---

## 📁 Project Folder Structure

```
bus-management-system/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/bms/
│   │   │   │   ├── config/             # Security, CORS, OpenAPI configurations
│   │   │   │   ├── controller/         # REST Controllers (Auth, Bus, Trip, Booking)
│   │   │   │   ├── dto/                # Request & Response DTO records/classes
│   │   │   │   ├── entity/             # JPA Entities (User, Bus, Route, Trip, Booking, Seat)
│   │   │   │   ├── exception/          # GlobalExceptionHandler & ResourceNotFoundException
│   │   │   │   ├── repository/         # Spring Data JPA Repository interfaces
│   │   │   │   ├── security/           # JwtUtils, JwtAuthenticationFilter, CustomUserDetailsService
│   │   │   │   └── service/            # Core business logic (BookingService, TripService)
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       └── schema.sql          # Initial database DDL & seed data
│   │   └── test/                       # JUnit 5 integration & concurrency tests
│   └── pom.xml
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── assets/                     # Logos, bus icons, background banners
│   │   ├── components/                 # Navbar, Footer, SeatMatrix, ProtectedRoute
│   │   ├── context/                    # AuthContext (JWT state & localStorage)
│   │   ├── pages/
│   │   │   ├── HomePage.jsx            # City search & Date picker
│   │   │   ├── TripResultsPage.jsx     # Bus cards with filters
│   │   │   ├── SeatSelectionPage.jsx   # Interactive seat layout modal/view
│   │   │   ├── CheckoutPage.jsx        # Passenger forms & mock payment
│   │   │   ├── TicketConfirmation.jsx  # PNR voucher & PDF download
│   │   │   ├── MyBookingsPage.jsx      # User booking history & cancellations
│   │   │   └── admin/                  # Admin dashboard, bus & trip dispatchers
│   │   ├── services/                   # Axios instance with auth interceptor
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── tailwind.config.js
│   └── package.json
└── README.md
```

---

## ⚙️ Prerequisites & Environment

Ensure the following tools are installed:
- **Java Development Kit (JDK):** 17 or 21 (`java -version`)
- **Apache Maven:** 3.8+ (`mvn -version`)
- **Node.js & npm:** Node 18+ & npm 9+ (`node -v`, `npm -v`)
- **MySQL Database Server:** 8.0+ running on port `3306`

---

## 🚀 Quick Start Guide

### 1. Database Configuration

Log into MySQL and execute:

```sql
CREATE DATABASE bus_management_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

Update your database credentials in `backend/src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/bus_management_db?useSSL=false&serverTimezone=UTC&allowPublicKeyRetrieval=true
spring.datasource.username=root
spring.datasource.password=your_mysql_password

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true

# JWT Secret (Base64 256-bit key)
jwt.secret=404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970
jwt.expirationMs=86400000
```

### 2. Backend Setup (Spring Boot)

```bash
cd backend

# Build and package the Spring Boot JAR
mvn clean install -DskipTests

# Run the application
mvn spring-boot:run
```
* Backend runs at: `http://localhost:8080`
* Swagger OpenAPI Docs: `http://localhost:8080/swagger-ui/index.html`

### 3. Frontend Setup (React.js)

```bash
cd frontend

# Install dependencies
npm install

# Start the Vite development server
npm run dev
```
* Frontend runs at: `http://localhost:5173`

---

## 📡 API Endpoints Specification

| Method | Endpoint | Access | Description |
|---|---|---|---|
| `POST` | `/api/auth/register` | Public | Register a new user |
| `POST` | `/api/auth/login` | Public | Login and receive Bearer JWT token |
| `GET` | `/api/routes/cities` | Public | Get list of available departure & arrival cities |
| `GET` | `/api/trips/search` | Public | Query trips (`?source=Mumbai&destination=Pune&date=2026-10-15`) |
| `GET` | `/api/trips/{id}/seats` | Public | Get seat map with current availability status |
| `POST` | `/api/bookings` | `ROLE_USER` | Confirm booking with passenger list & payment |
| `GET` | `/api/bookings/my` | `ROLE_USER` | View logged-in user's bookings |
| `PUT` | `/api/bookings/{id}/cancel` | `ROLE_USER` | Cancel ticket and compute refund |
| `POST` | `/api/admin/buses` | `ROLE_ADMIN` | Add new bus & generate default seat layout |
| `POST` | `/api/admin/trips` | `ROLE_ADMIN` | Schedule a new journey |
| `GET` | `/api/admin/reports` | `ROLE_ADMIN` | Revenue and fleet occupancy metrics |

---

## 🔒 Concurrency & Anti-Double-Booking Strategy

A critical requirement in bus reservation systems is preventing two users from purchasing the exact same seat at the same instant.

### Implementation Architecture:
1. **Database-Level Protection:**
   The `booking_items` table contains a composite unique constraint:
   ```sql
   UNIQUE KEY uq_active_trip_seat (trip_id, seat_id, is_active)
   ```
2. **Spring Service Concurrency Locking:**
   Inside `BookingService.java`, the checkout method is marked `@Transactional`:
   ```java
   @Transactional(isolation = Isolation.READ_COMMITTED)
   public BookingResponse bookSeats(BookingRequest request, User currentUser) {
       // Acquire pessimistic write lock on trip
       Trip trip = tripRepository.findByIdWithLock(request.getTripId())
           .orElseThrow(() -> new ResourceNotFoundException("Trip not found"));

       // Check if any requested seat is already reserved
       List<Long> alreadyBooked = bookingItemRepository.findBookedSeatIds(trip.getId(), request.getSeatIds());
       if (!alreadyBooked.isEmpty()) {
           throw new SeatAlreadyBookedException("Seats " + alreadyBooked + " are already booked.");
       }

       // Save booking, items, and payment atomically
       return finalizeBooking(trip, request, currentUser);
   }
   ```
   *If a conflict occurs, the losing transaction rolls back immediately and returns an HTTP `409 CONFLICT` message to the frontend without corrupting data.*

---

## 🧪 Testing & Sample Seed Data

### Default Credentials (for Demo / Viva):
| Role | Email | Password |
|---|---|---|
| **Admin** | `admin@bms.com` | `Admin@123` |
| **Passenger** | `john@example.com` | `User@123` |

### Sample Route Data Seeded:
- **Mumbai (Dadar) ➔ Pune (Swargate):** Volvo Multi-Axle AC Sleeper
- **Mumbai (Borivali) ➔ Nashik (CBS):** BharatBenz Non-AC Seater
- **Pune ➔ Goa (Panaji):** Scania Luxury Sleeper

---

## 📜 License & Academic Attribution
Developed as an Academic Mini-Project for **University of Mumbai** Bachelor of Engineering (B.E.).  
Released under the **MIT License**. Free for educational and learning purposes.
