package com.group3.SWD392_FALL25.dto.request;

import lombok.Data;

@Data
public class CinemaRequest {
    private String name;
    private String province;
    private Long cinemaChainId;
}
