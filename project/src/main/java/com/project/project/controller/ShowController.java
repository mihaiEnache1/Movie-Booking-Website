package com.project.project.controller;

import com.project.project.entity.Movie;
import com.project.project.entity.Screen;
import com.project.project.entity.Show;
import com.project.project.service.MovieService;
import com.project.project.service.ScreenService;
import com.project.project.service.ShowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ShowController {
    @Autowired
    private ShowService showService;
    @Autowired
    private MovieService movieService;
    @Autowired
    private ScreenService screenService;

    @PreAuthorize("hasRole('Admin')")
    @PostMapping("/addShow/{movieId}/{screenId}/save")
    public Show addShow(@PathVariable(value = "movieId") Long movieId, @PathVariable(value = "screenId") Long screenId,
                        @RequestBody Show show) {
        Movie movie = movieService.getMovieById(movieId);
        show.setMovie(movie);
        Screen screen = screenService.getById(screenId);
        show.setScreen(screen);
        return showService.addShow(show);
    }

    @GetMapping("/getShows")
    public List<Show> getShows() {
        return showService.getShows();
    }

    @PreAuthorize("hasRole('Admin')")
    @DeleteMapping("/deleteShow/{id}")
    public void deleteShow(@PathVariable("id") Long id) {
        showService.deleteById(id);
    }

    @GetMapping("/getShowById/{id}")
    public Show getById(@PathVariable Long id) {
        return showService.getById(id);
    }

    @GetMapping("/getShowsByMovie/{id}")
    public List<Show> getShowsByMovie(@PathVariable Long id) {
        return showService.getShowsByMovie(id);
    }
}
