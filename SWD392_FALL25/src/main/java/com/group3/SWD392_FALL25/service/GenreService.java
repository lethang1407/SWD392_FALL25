package com.group3.SWD392_FALL25.service;

import com.group3.SWD392_FALL25.dto.request.GenreRequest;
import com.group3.SWD392_FALL25.dto.response.GenreResponse;
import com.group3.SWD392_FALL25.entity.Genre;
import com.group3.SWD392_FALL25.repository.GenreRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GenreService {
    private final GenreRepository genreRepository;

    public List<GenreResponse> getAllGenres() {
        return genreRepository.findAll()
                .stream()
                .map(this::toResponse)
                .collect(Collectors.toList());
    }

    public GenreResponse createGenre(GenreRequest request) {
        Genre genre = new Genre();
        genre.setName(request.getName());
        Genre saved = genreRepository.save(genre);
        return toResponse(saved);
    }

    private GenreResponse toResponse(Genre genre) {
        GenreResponse response = new GenreResponse();
        response.setId(genre.getId());
        response.setName(genre.getName());
        return response;
    }
}
