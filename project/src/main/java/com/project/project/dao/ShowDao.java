package com.project.project.dao;

import com.project.project.entity.Show;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ShowDao extends CrudRepository<Show, Long> {
    List<Show> getShowsByMovieId(Long id);
}
