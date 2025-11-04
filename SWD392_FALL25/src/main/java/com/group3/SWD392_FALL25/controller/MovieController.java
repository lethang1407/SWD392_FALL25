package com.group3.SWD392_FALL25.controller;

import com.group3.SWD392_FALL25.dto.response.MovieResponse;
import com.group3.SWD392_FALL25.entity.Movie;
import com.group3.SWD392_FALL25.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/movies")
public class MovieController {

    @Autowired
    private MovieService movieService;

    @GetMapping("/infor")
    public ResponseEntity<List<MovieResponse>> getMoviesForHomepage() {
        List<Movie> movies = movieService.getAllMovies();
        List<MovieResponse> response = movies.stream().map(MovieResponse::fromEntity).toList();
        return ResponseEntity.ok(response);
    }
}


