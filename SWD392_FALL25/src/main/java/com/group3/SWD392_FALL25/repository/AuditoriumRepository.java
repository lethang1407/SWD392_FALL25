package com.group3.SWD392_FALL25.repository;

import com.group3.SWD392_FALL25.entity.Auditorium;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AuditoriumRepository extends JpaRepository<Auditorium, Long> {
    List<Auditorium> findByCinemaId(Long cinemaId);
}
