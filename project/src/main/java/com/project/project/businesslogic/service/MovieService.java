package com.project.project.businesslogic.service;

import com.project.project.dataaccess.dao.MovieDao;
import com.project.project.entity.Movie;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MovieService {
    @Autowired
    private MovieDao movieDao;
    public Movie addNewMovie(Movie movie) {
        return movieDao.save(movie);
    }

    public List<Movie> getMovies(int pageNumber, String searchKey) {
        Pageable pageable = PageRequest.of(pageNumber, 5);
        if (searchKey.equals("")) {
            return movieDao.findAll(pageable);
        } else {
            return movieDao.findByTitleContainingIgnoreCase(searchKey, pageable);
        }
    }

    public List<Movie> getMovieList() {
        return (List<Movie>) movieDao.findAll();
    }

    public void deleteMovie(Long id) {
        movieDao.deleteById(id);
    }

    public Movie getMovieById(Long id) {
        return movieDao.findById(id).get();
    }

    public Movie updateMovie(Movie movie) {
        return movieDao.save(movie);
    }
}
