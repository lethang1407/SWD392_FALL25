package com.group3.SWD392_FALL25.service;

import com.group3.SWD392_FALL25.dto.request.ShowtimeRequest;
import com.group3.SWD392_FALL25.dto.response.ShowtimeResponse;
import com.group3.SWD392_FALL25.entity.Auditorium;
import com.group3.SWD392_FALL25.entity.Movie;
import com.group3.SWD392_FALL25.entity.Showtime;
import com.group3.SWD392_FALL25.repository.AuditoriumRepository;
import com.group3.SWD392_FALL25.repository.MovieRepository;
import com.group3.SWD392_FALL25.repository.ShowtimeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShowtimeService {

    private final ShowtimeRepository showtimeRepository;
    private final MovieRepository movieRepository;
    private final AuditoriumRepository auditoriumRepository;

    public ShowtimeService(ShowtimeRepository showtimeRepository,
                           MovieRepository movieRepository,
                           AuditoriumRepository auditoriumRepository) {
        this.showtimeRepository = showtimeRepository;
        this.movieRepository = movieRepository;
        this.auditoriumRepository = auditoriumRepository;
    }

    public List<ShowtimeResponse> getAllShowtimes() {
        return showtimeRepository.findAll()
                .stream()
                .map(ShowtimeResponse::fromEntity)
                .toList();
    }

    public ShowtimeResponse getShowtimeById(Long id) {
        Showtime showtime = showtimeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy suất chiếu ID = " + id));
        return ShowtimeResponse.fromEntity(showtime);
    }

    public ShowtimeResponse createShowtime(ShowtimeRequest request) {
        Movie movie = movieRepository.findById(request.getMovieId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy phim ID = " + request.getMovieId()));

        Auditorium auditorium = auditoriumRepository.findById(request.getAuditoriumId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy phòng chiếu ID = " + request.getAuditoriumId()));

        Showtime showtime = Showtime.builder()
                .movie(movie)
                .auditorium(auditorium)
                .startAt(request.getStartAt())
                .endAt(request.getEndAt())
                .status(request.getStatus())
                .build();

        showtimeRepository.save(showtime);
        return ShowtimeResponse.fromEntity(showtime);
    }

    public ShowtimeResponse updateShowtime(Long id, ShowtimeRequest request) {
        Showtime showtime = showtimeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy suất chiếu ID = " + id));

        if (request.getMovieId() != null) {
            Movie movie = movieRepository.findById(request.getMovieId())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy phim ID = " + request.getMovieId()));
            showtime.setMovie(movie);
        }

        if (request.getAuditoriumId() != null) {
            Auditorium auditorium = auditoriumRepository.findById(request.getAuditoriumId())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy phòng chiếu ID = " + request.getAuditoriumId()));
            showtime.setAuditorium(auditorium);
        }

        if (request.getStartAt() != null) showtime.setStartAt(request.getStartAt());
        if (request.getEndAt() != null) showtime.setEndAt(request.getEndAt());
        if (request.getStatus() != null) showtime.setStatus(request.getStatus());

        showtimeRepository.save(showtime);
        return ShowtimeResponse.fromEntity(showtime);
    }

    public void deleteShowtime(Long id) {
        showtimeRepository.deleteById(id);
    }
}
