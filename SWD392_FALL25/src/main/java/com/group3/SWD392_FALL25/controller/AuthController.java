package com.group3.SWD392_FALL25.controller;

import com.group3.SWD392_FALL25.dto.LoginRequest;
import com.group3.SWD392_FALL25.dto.LoginResponse;
import com.group3.SWD392_FALL25.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            LoginResponse admin = authService.login(request.getUsername(), request.getPassword());
            return ResponseEntity.ok(admin);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
