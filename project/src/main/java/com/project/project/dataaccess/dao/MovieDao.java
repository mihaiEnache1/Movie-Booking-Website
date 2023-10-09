package com.project.project.dataaccess.dao;

import com.project.project.entity.Movie;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MovieDao extends CrudRepository<Movie, Long> {
    List<Movie> findAll(Pageable pageable);
    List<Movie> findByTitleContainingIgnoreCase(String title, Pageable pageable);
}
