package com.project.project.businesslogic.controller;

import com.project.project.entity.Screen;
import com.project.project.entity.Theatre;
import com.project.project.businesslogic.service.ScreenService;
import com.project.project.businesslogic.service.TheatreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ScreenController {
    @Autowired
    private ScreenService screenService;
    @Autowired
    private TheatreService theatreService;

    @PreAuthorize("hasRole('Admin')")
    @PostMapping("/addScreen/{id}/save")
    public Screen addScreen(@PathVariable(value = "id") Long id, @RequestBody Screen screen) {
        Theatre theatre = theatreService.getById(id);
        screen.setTheatre(theatre);
        return screenService.addScreen(screen);
    }

    @GetMapping("/getScreens")
    public List<Screen> getScreens() {
        return screenService.getScreens();
    }

    @PreAuthorize("hasRole('Admin')")
    @DeleteMapping("/deleteScreen/{id}")
    public void deleteScreen(@PathVariable("id") Long id) {
        screenService.deleteById(id);
    }

    @GetMapping("/getScreenById/{id}")
    public Screen getById(@PathVariable Long id) {
        return screenService.getById(id);
    }

    @GetMapping("/getScreensByTheatre/{id}")
    public List<Screen> getScreensByTheatre(@PathVariable Long id) {
        return screenService.getScreensByTheatre(id);
    }
}
