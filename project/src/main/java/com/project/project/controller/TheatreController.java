package com.project.project.controller;

import com.project.project.entity.Theatre;
import com.project.project.service.TheatreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class TheatreController {
    @Autowired
    private TheatreService theatreService;

    @PreAuthorize("hasRole('Admin')")
    @PostMapping("/addTheatre")
    public Theatre addTheatre(@RequestBody Theatre theatre) {
        return theatreService.addTheatre(theatre);
    }

    @GetMapping("/getTheatres")
    public List<Theatre> getTheatres() {
        return theatreService.getTheatres();
    }

    @PreAuthorize("hasRole('Admin')")
    @DeleteMapping("/deleteTheatre/{id}")
    public void deleteTheatre(@PathVariable("id") Long id) {
        theatreService.deleteById(id);
    }

    @GetMapping("/getTheatreById/{id}")
    public Theatre getById(@PathVariable Long id) {
        return theatreService.getById(id);
    }
}
