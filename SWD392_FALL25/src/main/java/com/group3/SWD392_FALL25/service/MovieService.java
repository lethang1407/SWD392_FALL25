package com.group3.SWD392_FALL25.service;

import com.group3.SWD392_FALL25.entity.Movie;
import com.group3.SWD392_FALL25.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieService {
    @Autowired
    private MovieRepository movieRepository;

    public List<Movie> getAllMovies() {
        return movieRepository.findAllWithGenres();
    }
}

