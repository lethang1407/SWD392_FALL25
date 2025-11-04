package com.group3.SWD392_FALL25.service;

import com.group3.SWD392_FALL25.dto.request.CinemaRequest;
import com.group3.SWD392_FALL25.dto.response.CinemaResponse;
import com.group3.SWD392_FALL25.entity.Cinema;
import com.group3.SWD392_FALL25.entity.CinemaChain;
import com.group3.SWD392_FALL25.repository.CinemaChainRepository;
import com.group3.SWD392_FALL25.repository.CinemaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CinemaService {

    private final CinemaRepository cinemaRepository;
    private final CinemaChainRepository cinemaChainRepository;

    public CinemaService(CinemaRepository cinemaRepository, CinemaChainRepository cinemaChainRepository) {
        this.cinemaRepository = cinemaRepository;
        this.cinemaChainRepository = cinemaChainRepository;
    }

    public List<CinemaResponse> getAllCinemas() {
        return cinemaRepository.findAll().stream()
                .map(CinemaResponse::fromEntity)
                .toList();
    }

    public CinemaResponse getCinemaById(Long id) {
        Cinema cinema = cinemaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy rạp có ID = " + id));
        return CinemaResponse.fromEntity(cinema);
    }

    public CinemaResponse createCinema(CinemaRequest request) {
        CinemaChain chain = null;
        if (request.getCinemaChainId() != null) {
            chain = cinemaChainRepository.findById(request.getCinemaChainId())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy chuỗi rạp có ID = " + request.getCinemaChainId()));
        }

        Cinema cinema = Cinema.builder()
                .name(request.getName())
                .province(request.getProvince())
                .cinemaChain(chain)
                .build();

        cinemaRepository.save(cinema);
        return CinemaResponse.fromEntity(cinema);
    }

    public CinemaResponse updateCinema(Long id, CinemaRequest request) {
        Cinema cinema = cinemaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy rạp có ID = " + id));

        if (request.getName() != null) cinema.setName(request.getName());
        if (request.getProvince() != null) cinema.setProvince(request.getProvince());
        if (request.getCinemaChainId() != null) {
            CinemaChain chain = cinemaChainRepository.findById(request.getCinemaChainId())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy chuỗi rạp có ID = " + request.getCinemaChainId()));
            cinema.setCinemaChain(chain);
        }

        cinemaRepository.save(cinema);
        return CinemaResponse.fromEntity(cinema);
    }

    public void deleteCinema(Long id) {
        cinemaRepository.deleteById(id);
    }
}
