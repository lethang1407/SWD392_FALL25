package com.group3.SWD392_FALL25.service;

import com.group3.SWD392_FALL25.dto.request.AuditoriumRequest;
import com.group3.SWD392_FALL25.dto.response.AuditoriumResponse;
import com.group3.SWD392_FALL25.entity.Auditorium;
import com.group3.SWD392_FALL25.entity.Cinema;
import com.group3.SWD392_FALL25.repository.AuditoriumRepository;
import com.group3.SWD392_FALL25.repository.CinemaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AuditoriumService {

    @Autowired
    private AuditoriumRepository auditoriumRepository;

    @Autowired
    private CinemaRepository cinemaRepository;

    private AuditoriumResponse mapToResponse(Auditorium a) {
        return AuditoriumResponse.builder()
                .id(a.getId())
                .name(a.getName())
                .roomType(a.getRoomType())
                .cinemaId(a.getCinema().getId())
                .cinemaName(a.getCinema().getName())
                .build();
    }

    public List<AuditoriumResponse> getAll() {
        return auditoriumRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public List<AuditoriumResponse> getByCinemaId(Long cinemaId) {
        return auditoriumRepository.findByCinemaId(cinemaId).stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    public AuditoriumResponse getById(Long id) {
        Auditorium auditorium = auditoriumRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy phòng chiếu với ID: " + id));
        return mapToResponse(auditorium);
    }

    public AuditoriumResponse create(AuditoriumRequest request) {
        Cinema cinema = cinemaRepository.findById(request.getCinemaId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy rạp với ID: " + request.getCinemaId()));

        Auditorium auditorium = Auditorium.builder()
                .name(request.getName())
                .roomType(request.getRoomType())
                .cinema(cinema)
                .build();

        Auditorium saved = auditoriumRepository.save(auditorium);
        return mapToResponse(saved);
    }

    public AuditoriumResponse update(Long id, AuditoriumRequest request) {
        Auditorium auditorium = auditoriumRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy phòng chiếu có ID: " + id));

        auditorium.setName(request.getName());
        auditorium.setRoomType(request.getRoomType());

        if (request.getCinemaId() != null) {
            Cinema cinema = cinemaRepository.findById(request.getCinemaId())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy rạp với ID: " + request.getCinemaId()));
            auditorium.setCinema(cinema);
        }

        Auditorium updated = auditoriumRepository.save(auditorium);
        return mapToResponse(updated);
    }

    public void delete(Long id) {
        auditoriumRepository.deleteById(id);
    }
}
