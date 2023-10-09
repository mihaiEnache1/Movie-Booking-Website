package com.project.project.dataaccess.dao;

import com.project.project.entity.Theatre;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TheatreDao extends CrudRepository<Theatre, Long> {
}
