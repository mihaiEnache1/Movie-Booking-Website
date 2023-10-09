package com.project.project.controller;

import com.project.project.entity.*;
import com.project.project.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@RestController
public class BookingController {
    @Autowired
    private BookingService bookingService;
    @Autowired
    private UserService userService;
    @Autowired
    private ShowService showService;
    @Autowired
    private MovieService movieService;

    @PostMapping("/addBooking/{userId}/{showId}/{movieId}/save")
    public Booking addBooking(@PathVariable String userId, @PathVariable Long showId,
                             @PathVariable Long movieId, @RequestBody Booking booking) {
        User user = userService.getById(userId);
        Show show = showService.getById(showId);
        Movie movie = movieService.getMovieById(movieId);
        booking.setUser(user);
        booking.setShow(show);
        booking.setMovie(movie);
        LocalDate date = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM d");
        String formattedDate = date.format(formatter);
        DateTimeFormatter parser = DateTimeFormatter.ofPattern("MMM d uuuu");
        LocalDate bookingDate = LocalDate.parse(formattedDate + " " + date.getYear(), parser);
        booking.setBookingDate(bookingDate);
        return bookingService.addBooking(booking);
    }

    @GetMapping("/getBookings")
    public List<Booking> getBookings() {
        return bookingService.getBookings();
    }

    @PreAuthorize("hasRole('Admin')")
    @DeleteMapping("/deleteBooking/{id}")
    public void deleteBooking(@PathVariable("id") Long id) {
        bookingService.deleteById(id);
    }

    @GetMapping("/getBookingById/{id}")
    public Booking getById(@PathVariable Long id) {
        return bookingService.getById(id);
    }
}
