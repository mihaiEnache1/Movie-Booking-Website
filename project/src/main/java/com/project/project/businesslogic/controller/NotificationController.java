package com.project.project.businesslogic.controller;

import com.project.project.entity.Observable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
public class NotificationController {
    @Autowired
    private final Observable observable;

    public NotificationController(Observable observable) {
        this.observable = observable;
    }

    @PostMapping("/notification")
    public String update(@RequestBody Map<String, String> requestBody) {
        String title = requestBody.get("title");
        observable.setUpdate(title);
        return "Email sent";
    }

}
