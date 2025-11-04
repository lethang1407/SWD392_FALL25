package com.group3.SWD392_FALL25.dto.request;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ShowtimeRequest {
    private Long movieId;
    private Long auditoriumId;
    private LocalDateTime startAt;
    private LocalDateTime endAt;
    private String status;
}
