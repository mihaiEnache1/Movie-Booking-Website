package com.project.project.businesslogic.service;

import com.project.project.dataaccess.dao.SeatDao;
import com.project.project.entity.Booking;
import com.project.project.entity.Seat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SeatService {
    @Autowired
    private SeatDao seatDao;
    @Autowired
    private BookingService bookingService;

    public Seat addSeat(Seat seat) {
        return seatDao.save(seat);
    }

    public List<Seat> getSeats() {
        return (List<Seat>) seatDao.findAll();
    }

    public Seat getById(Long id) {
        return seatDao.findById(id).get();
    }

    public void deleteById(Long id) {
        seatDao.deleteById(id);
    }

    public List<Seat> getSeatsByShowId(Long id) {
        return seatDao.getSeatsByShowId(id);
    }

    public List<Seat> getSeatsByBookingId(Long id) {
        return seatDao.getSeatsByBookingId(id);
    }

    public List<Seat> updateSeats(Long bookingId, Long showId, List<Seat> seats) {
        List<Seat> previousStateSeats = getSeatsByShowId(showId);
        List<Seat> updatedSeats = new ArrayList<>();
        Booking booking = bookingService.getById(bookingId);
        for (int i=0; i<seats.size(); i++) {
            if (previousStateSeats.get(i).getIsAvailable()) {
                if (previousStateSeats.get(i).getIsAvailable() != seats.get(i).getIsAvailable()) {
                    seats.get(i).setBooking(booking);
                    seats.get(i).setShow(previousStateSeats.get(i).getShow());
                    Seat seat = seatDao.save(seats.get(i));
                    updatedSeats.add(seat);
                }
            }
        }
        return updatedSeats;
    }
}
