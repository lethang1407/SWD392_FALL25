package com.group3.SWD392_FALL25.dto.request;

import lombok.*;
import lombok.experimental.FieldDefaults;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
public class AuditoriumRequest {
    String name;
    String roomType;
    Long cinemaId;
}
