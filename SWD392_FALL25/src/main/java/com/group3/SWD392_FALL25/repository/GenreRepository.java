package com.group3.SWD392_FALL25.repository;

import com.group3.SWD392_FALL25.entity.Genre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GenreRepository extends JpaRepository<Genre, Long> {
}
