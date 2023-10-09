package com.project.project.dao;

import com.project.project.entity.Screen;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScreenDao extends CrudRepository<Screen, Long> {
    List<Screen> getScreensByTheatreId(Long id);
}
