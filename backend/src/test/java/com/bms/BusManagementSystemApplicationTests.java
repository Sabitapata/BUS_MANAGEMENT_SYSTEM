package com.bms;

import com.bms.dto.AuthDTOs.LoginRequest;
import com.bms.dto.AuthDTOs.AuthResponse;
import com.bms.service.AuthService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class BusManagementSystemApplicationTests {

    @Autowired
    private AuthService authService;

    @Test
    void testPassengerLogin() {
        LoginRequest req = new LoginRequest("passenger@example.com", "User@123");
        AuthResponse res = authService.login(req);
        assertNotNull(res.getToken());
        assertEquals("passenger@example.com", res.getEmail());
        assertEquals("ROLE_USER", res.getRole());
    }

    @Test
    void testAdminLogin() {
        LoginRequest req = new LoginRequest("admin@bms.com", "Admin@123");
        AuthResponse res = authService.login(req);
        assertNotNull(res.getToken());
        assertEquals("admin@bms.com", res.getEmail());
        assertEquals("ROLE_ADMIN", res.getRole());
    }
}
