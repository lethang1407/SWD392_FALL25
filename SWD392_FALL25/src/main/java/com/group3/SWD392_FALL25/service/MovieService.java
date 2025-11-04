package com.group3.SWD392_FALL25.service;

import com.group3.SWD392_FALL25.dto.request.MovieRequest;
import com.group3.SWD392_FALL25.dto.response.MovieResponse;
import com.group3.SWD392_FALL25.entity.Genre;
import com.group3.SWD392_FALL25.entity.Movie;
import com.group3.SWD392_FALL25.repository.GenreRepository;
import com.group3.SWD392_FALL25.repository.MovieRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MovieService {
    private final MovieRepository movieRepository;
    private final GenreRepository genreRepository;

    public MovieService(MovieRepository movieRepository, GenreRepository genreRepository) {
        this.movieRepository = movieRepository;
        this.genreRepository = genreRepository;
    }

    // 🔹 Lấy tất cả phim
    public List<MovieResponse> getAllMovies() {
        return movieRepository.findAllWithGenres()
                .stream()
                .map(MovieResponse::fromEntity)
                .collect(Collectors.toList());
    }

    // 🔹 Lấy phim theo ID
    public MovieResponse getMovieById(Long id) {
        Movie movie = movieRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy phim có ID = " + id));
        return MovieResponse.fromEntity(movie);
    }

    // 🔹 Tạo mới phim
    public MovieResponse createMovie(MovieRequest request) {
        Movie movie = new Movie();
        mapRequestToEntity(request, movie);
        Movie saved = movieRepository.save(movie);
        return MovieResponse.fromEntity(saved);
    }

    // 🔹 Cập nhật phim
    public MovieResponse updateMovie(Long id, MovieRequest request) {
        Movie movie = movieRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy phim có ID = " + id));
        mapRequestToEntity(request, movie);
        Movie updated = movieRepository.save(movie);
        return MovieResponse.fromEntity(updated);
    }

    // 🔹 Xóa phim
    public void deleteMovie(Long id) {
        movieRepository.deleteById(id);
    }

    // ✅ Hàm private: ánh xạ dữ liệu từ request sang entity
    private void mapRequestToEntity(MovieRequest request, Movie movie) {
        movie.setTitle(request.getTitle());
        movie.setDescription(request.getDescription());
        movie.setDurationMin(request.getDurationMin());
        movie.setImage(request.getImage());

        if (request.getGenreIds() != null && !request.getGenreIds().isEmpty()) {
            List<Genre> genres = genreRepository.findAllById(request.getGenreIds());
            movie.setGenres(genres);
        }
    }
}
