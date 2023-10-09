package com.project.project.businesslogic.service;

import com.project.project.dataaccess.dao.TheatreDao;
import com.project.project.entity.Theatre;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TheatreService {
    @Autowired
    private TheatreDao theatreDao;

    public Theatre addTheatre(Theatre theatre) {
        return theatreDao.save(theatre);
    }

    public List<Theatre> getTheatres() {
        return (List<Theatre>) theatreDao.findAll();
    }

    public void deleteById(Long id) {
        theatreDao.deleteById(id);
    }

    public Theatre getById(Long id) {
        return theatreDao.findById(id).get();
    }
}
