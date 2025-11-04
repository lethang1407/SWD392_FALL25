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
@Table(name = "Movie")
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    String image;
    @Column(name = "title", columnDefinition = "NVARCHAR(255)")
    String title;
    @Column(name = "description", columnDefinition = "NVARCHAR(255)")
    String description;

    @Column(name = "duration_min")
    int durationMin;

    @OneToMany(mappedBy = "movie")
    List<Showtime> showtimes;

    @ManyToMany
    @JoinTable(
            name = "movie_genre",
            joinColumns = @JoinColumn(name = "movie_id"),
            inverseJoinColumns = @JoinColumn(name = "genre_id")
    )
    List<Genre> genres;
}
