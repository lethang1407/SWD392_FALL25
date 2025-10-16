package com.group3.SWD392_FALL25.dto;

import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {
    private String role;
    private String username;
}
