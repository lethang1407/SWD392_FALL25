package com.group3.SWD392_FALL25.dto.response;

import com.group3.SWD392_FALL25.entity.Genre;
import com.group3.SWD392_FALL25.entity.Movie;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MovieResponse {
    private Long id;
    private String title;
    private String description;
    private Integer durationMin;
    private String image;
    private List<String> genres;

    public static MovieResponse fromEntity(Movie movie) {
        List<String> genreNames = movie.getGenres()
                .stream()
                .map(Genre::getName)
                .toList();

        return new MovieResponse(
                movie.getId(),
                movie.getTitle(),
                movie.getDescription(),
                movie.getDurationMin(),
                movie.getImage(),
                genreNames
        );
    }
}

