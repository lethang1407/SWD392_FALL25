package com.group3.SWD392_FALL25.dto.response;

import com.group3.SWD392_FALL25.entity.Showtime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ShowtimeResponse {
    private Long id;
    private String movieTitle;
    private String auditoriumName;
    private LocalDateTime startAt;
    private LocalDateTime endAt;
    private String status;

    public static ShowtimeResponse fromEntity(Showtime s) {
        return new ShowtimeResponse(
                s.getId(),
                s.getMovie() != null ? s.getMovie().getTitle() : null,
                s.getAuditorium() != null ? s.getAuditorium().getName() : null,
                s.getStartAt(),
                s.getEndAt(),
                s.getStatus()
        );
    }
}
