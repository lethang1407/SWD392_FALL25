package com.group3.SWD392_FALL25.service;

import com.group3.SWD392_FALL25.dto.ApiResponse;
import com.group3.SWD392_FALL25.dto.request.LoginRequest;
import com.group3.SWD392_FALL25.dto.response.LoginResponse;
import com.group3.SWD392_FALL25.entity.Account;
import com.group3.SWD392_FALL25.repository.AccountRepository;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private AccountRepository accountRepo;

    public ApiResponse<LoginResponse> handleLogin(LoginRequest request, HttpSession session) {
        Optional<Account> accountOpt = accountRepo.findByUsername(request.getUsername());

        if (accountOpt.isEmpty()) {
            return ApiResponse.<LoginResponse>builder()
                    .code(401)
                    .message("Invalid username or password")
                    .build();
        }

        Account account = accountOpt.get();
        if (!account.getPassword().equals(request.getPassword())) {
            return ApiResponse.<LoginResponse>builder()
                    .code(401)
                    .message("Invalid username or password")
                    .build();
        }

        LoginResponse loginResponse = new LoginResponse(account.getRole(), account.getUsername());

        session.setAttribute("user", loginResponse);
        session.setMaxInactiveInterval(24 * 60 * 60);

        return ApiResponse.<LoginResponse>builder()
                .code(200)
                .message("Login successful")
                .data(loginResponse)
                .build();
    }

    public ApiResponse<String> handleLogout(HttpSession session) {
        try {
            session.invalidate();
            return ApiResponse.<String>builder()
                    .code(200)
                    .message("Logout successful")
                    .data("Session cleared successfully.")
                    .build();
        } catch (Exception e) {
            return ApiResponse.<String>builder()
                    .code(500)
                    .message("Logout failed: " + e.getMessage())
                    .build();
        }
    }

    public ApiResponse<LoginResponse> getCurrentUser(HttpSession session) {
        LoginResponse user = (LoginResponse) session.getAttribute("user");
        if (user != null) {
            return ApiResponse.<LoginResponse>builder()
                    .code(200)
                    .message("User is logged in")
                    .data(user)
                    .build();
        }
        return ApiResponse.<LoginResponse>builder()
                .code(401)
                .message("No active session or user not logged in")
                .build();
    }
}