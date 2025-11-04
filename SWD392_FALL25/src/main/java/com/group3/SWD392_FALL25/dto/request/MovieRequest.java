package com.group3.SWD392_FALL25.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MovieRequest {
    private String title;
    private String description;
    private Integer durationMin;
    private String image;
    private List<Long> genreIds;
}
