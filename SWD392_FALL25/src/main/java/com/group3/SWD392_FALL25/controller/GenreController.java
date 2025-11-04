package com.group3.SWD392_FALL25.controller;

import com.group3.SWD392_FALL25.dto.request.GenreRequest;
import com.group3.SWD392_FALL25.dto.response.GenreResponse;
import com.group3.SWD392_FALL25.service.GenreService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/genres")
@RequiredArgsConstructor
public class GenreController {
    private final GenreService genreService;

    @GetMapping
    public List<GenreResponse> getAllGenres() {
        return genreService.getAllGenres();
    }

    @PostMapping
    public GenreResponse createGenre(@RequestBody GenreRequest request) {
        return genreService.createGenre(request);
    }
}
