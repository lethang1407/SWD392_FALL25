package com.group3.SWD392_FALL25.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@Table(name = "Auditorium")
public class Auditorium {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String name;
    String roomType;

    @ManyToOne
    @JoinColumn(name = "cinema_id")
    Cinema cinema;

    @OneToMany(mappedBy = "auditorium")
    List<Showtime> showtimes;
}
