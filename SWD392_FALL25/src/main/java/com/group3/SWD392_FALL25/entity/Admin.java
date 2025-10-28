package com.group3.SWD392_FALL25.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "Admin")
public class Admin {
    @Id
    @GeneratedValue
    Long id;

    @Column(unique = true, nullable = false)
    String username;

    @Column(nullable = false)
    String password;

    String role;

    @Column(nullable = false, columnDefinition = "NVARCHAR(255)")
    String fullName;

    String avatar;

    @Column(unique = true)
    String email;

    @Column(unique = true)
    String phone;
}
