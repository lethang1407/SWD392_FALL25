package com.group3.SWD392_FALL25.service;

import com.group3.SWD392_FALL25.dto.LoginResponse;
import com.group3.SWD392_FALL25.entity.Admin;
import com.group3.SWD392_FALL25.entity.Customer;
import com.group3.SWD392_FALL25.repository.AdminRepository;
import com.group3.SWD392_FALL25.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private AdminRepository adminRepo;

    @Autowired
    private CustomerRepository customerRepo;

    public LoginResponse login(String username, String password) {
        Optional<Admin> adminOpt = adminRepo.findByUsername(username);
        if (adminOpt.isPresent() && adminOpt.get().getPassword().equals(password)) {
            return new LoginResponse("admin", adminOpt.get().getUsername());
        }

        Optional<Customer> cusOpt = customerRepo.findByUsername(username);
        if (cusOpt.isPresent() && cusOpt.get().getPassword().equals(password)) {
            return new LoginResponse("customer", cusOpt.get().getUsername());
        }

        return null; // sai thông tin đăng nhập
    }
}
