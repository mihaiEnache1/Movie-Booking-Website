package com.project.project.service;

import com.project.project.dao.ScreenDao;
import com.project.project.entity.Screen;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScreenService {
    @Autowired
    private ScreenDao screenDao;

    public Screen addScreen(Screen screen) {
        return screenDao.save(screen);
    }

    public List<Screen> getScreens() {
        return (List<Screen>) screenDao.findAll();
    }

    public Screen getById(Long id) {
        return screenDao.findById(id).get();
    }

    public void deleteById(Long id) {
        screenDao.deleteById(id);
    }

    public List<Screen> getScreensByTheatre(Long id) {
        return screenDao.getScreensByTheatreId(id);
    }
}
