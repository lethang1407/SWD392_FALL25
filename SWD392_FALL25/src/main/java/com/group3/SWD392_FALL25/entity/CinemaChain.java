package com.group3.SWD392_FALL25.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "CinemaChain")
public class CinemaChain {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String name;

    @Column(name = "created_at")
    LocalDateTime createdAt;

    @Column(name = "created_by")
    Integer createdBy;

    @Column(name = "updated_by")
    Integer updatedBy;

    @OneToMany(mappedBy = "cinemaChain")
    List<Cinema> cinemas;
}
