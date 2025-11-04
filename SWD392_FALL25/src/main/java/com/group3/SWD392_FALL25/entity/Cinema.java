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
@Table(name = "Cinema")
public class Cinema {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(name = "name", columnDefinition = "NVARCHAR(255)")
    String name;
    @Column(name = "province", columnDefinition = "NVARCHAR(255)")
    String province;

    @ManyToOne
    @JoinColumn(name = "cinema_chain_id")
    CinemaChain cinemaChain;

    @OneToMany(mappedBy = "cinema")
    List<Auditorium> auditoriums;
}
