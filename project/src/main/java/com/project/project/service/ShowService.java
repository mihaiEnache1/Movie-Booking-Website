package com.project.project.service;

import com.project.project.dao.ShowDao;
import com.project.project.entity.Show;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ShowService {
    @Autowired
    private ShowDao showDao;

    public Show addShow(Show show) {
        return showDao.save(show);
    }

    public List<Show> getShows() {
        return (List<Show>) showDao.findAll();
    }

    public Show getById(Long id) {
        return showDao.findById(id).get();
    }

    public void deleteById(Long id) {
        showDao.deleteById(id);
    }

    public List<Show> getShowsByMovie(Long id) {
        return showDao.getShowsByMovieId(id);
    }
}
