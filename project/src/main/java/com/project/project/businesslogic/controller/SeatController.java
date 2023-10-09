package com.project.project.businesslogic.controller;

import com.project.project.entity.Seat;
import com.project.project.entity.Show;
import com.project.project.businesslogic.service.BookingService;
import com.project.project.businesslogic.service.SeatService;
import com.project.project.businesslogic.service.ShowService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class SeatController {
    @Autowired
    private SeatService seatService;
    @Autowired
    private ShowService showService;
    @Autowired
    private BookingService bookingService;

    @PreAuthorize("hasRole('Admin')")
    @PostMapping("/addSeat/{id}")
    public Seat addSeat(@RequestBody Seat seat, @PathVariable Long id) {
        Show show = showService.getById(id);
        seat.setShow(show);
        return seatService.addSeat(seat);
    }

    @GetMapping("/getSeats")
    public List<Seat> getSeats() {
        return seatService.getSeats();
    }

    @PreAuthorize("hasRole('Admin')")
    @DeleteMapping("/deleteSeat/{id}")
    public void deleteSeat(@PathVariable("id") Long id) {
        seatService.deleteById(id);
    }

    @GetMapping("/getSeatById/{id}")
    public Seat getById(@PathVariable Long id) {
        return seatService.getById(id);
    }

    @GetMapping("/getSeatsByShowId/{id}")
    public List<Seat> getSeatsByShowId(@PathVariable Long id) {
        return seatService.getSeatsByShowId(id);
    }

    @PutMapping("/updateSeats/{bookingId}/{showId}")
    public List<Seat> updateSeats(@PathVariable(value = "bookingId") Long bookingId, @PathVariable(value = "showId") Long showId,
                                  @RequestBody List<Seat> seats) {
        return seatService.updateSeats(bookingId, showId, seats);
    }
}
