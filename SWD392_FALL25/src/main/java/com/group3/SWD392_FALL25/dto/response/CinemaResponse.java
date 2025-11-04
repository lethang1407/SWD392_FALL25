package com.group3.SWD392_FALL25.dto.response;

import com.group3.SWD392_FALL25.entity.Cinema;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CinemaResponse {
    private Long id;
    private String name;
    private String province;
    private String cinemaChainName;

    public static CinemaResponse fromEntity(Cinema cinema) {
        return new CinemaResponse(
                cinema.getId(),
                cinema.getName(),
                cinema.getProvince(),
                cinema.getCinemaChain() != null ? cinema.getCinemaChain().getName() : null
        );
    }
}
