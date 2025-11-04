package com.group3.SWD392_FALL25.dto.response;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AuditoriumResponse {
    Long id;
    String name;
    String roomType;
    Long cinemaId;
    String cinemaName;
}
