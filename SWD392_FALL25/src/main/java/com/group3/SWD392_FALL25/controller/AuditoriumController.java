package com.group3.SWD392_FALL25.controller;

import com.group3.SWD392_FALL25.dto.request.AuditoriumRequest;
import com.group3.SWD392_FALL25.dto.response.AuditoriumResponse;
import com.group3.SWD392_FALL25.service.AuditoriumService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/auditoriums")
public class AuditoriumController {

    @Autowired
    private AuditoriumService auditoriumService;

    @GetMapping
    public ResponseEntity<List<AuditoriumResponse>> getAll() {
        return ResponseEntity.ok(auditoriumService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<AuditoriumResponse> getById(@PathVariable Long id) {
        return ResponseEntity.ok(auditoriumService.getById(id));
    }

    @GetMapping("/cinema/{cinemaId}")
    public ResponseEntity<List<AuditoriumResponse>> getByCinemaId(@PathVariable Long cinemaId) {
        return ResponseEntity.ok(auditoriumService.getByCinemaId(cinemaId));
    }

    @PostMapping
    public ResponseEntity<AuditoriumResponse> create(@RequestBody AuditoriumRequest request) {
        return ResponseEntity.ok(auditoriumService.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<AuditoriumResponse> update(@PathVariable Long id, @RequestBody AuditoriumRequest request) {
        return ResponseEntity.ok(auditoriumService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        auditoriumService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
