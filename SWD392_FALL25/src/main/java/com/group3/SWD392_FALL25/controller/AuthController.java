package com.group3.SWD392_FALL25.controller;

import com.group3.SWD392_FALL25.dto.ApiResponse;
import com.group3.SWD392_FALL25.dto.request.LoginRequest;
import com.group3.SWD392_FALL25.dto.response.LoginResponse;
import com.group3.SWD392_FALL25.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ApiResponse<LoginResponse> login(@RequestBody LoginRequest request) {
        try {
            LoginResponse login = authService.login(request.getUsername(), request.getPassword());
            return ApiResponse.<LoginResponse>builder()
                    .code(200)
                    .message("Login successful")
                    .data(login)
                    .build();
        } catch (RuntimeException e) {
            return ApiResponse.<LoginResponse>builder()
                    .code(404)
                    .message("Login fail")
                    .build();
        }
    }
}
