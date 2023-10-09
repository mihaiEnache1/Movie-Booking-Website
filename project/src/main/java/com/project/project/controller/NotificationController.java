package com.project.project.controller;

import com.project.project.entity.Observable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
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
        System.out.println("-------------------Am ajuns in notification controller---------------------");
        String title = requestBody.get("title");
        observable.setUpdate(title);
        return "Email sent";
    }

}
