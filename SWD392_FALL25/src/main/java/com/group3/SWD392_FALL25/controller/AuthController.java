package com.group3.SWD392_FALL25.controller;

import com.group3.SWD392_FALL25.dto.ApiResponse;
import com.group3.SWD392_FALL25.dto.request.LoginRequest;
import com.group3.SWD392_FALL25.dto.response.LoginResponse;
import com.group3.SWD392_FALL25.service.AuthService;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ApiResponse<LoginResponse> login(@RequestBody LoginRequest request, HttpSession session) {
        return authService.handleLogin(request, session);
    }

    @PostMapping("/logout")
    public ApiResponse<String> logout(HttpSession session) {
        return authService.handleLogout(session);
    }

    @GetMapping("/current-user")
    public ApiResponse<LoginResponse> getCurrentUser(HttpSession session) {
        return authService.getCurrentUser(session);
    }
}