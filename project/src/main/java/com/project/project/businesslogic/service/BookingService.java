package com.project.project.businesslogic.service;

import com.project.project.dataaccess.dao.BookingDao;
import com.project.project.entity.Booking;
import com.project.project.entity.Movie;
import com.project.project.entity.Show;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {
    @Autowired
    private BookingDao bookingDao;

    public Booking addBooking(Booking booking) {
        return bookingDao.save(booking);
    }

    public List<Booking> getBookings() {
        return (List<Booking>) bookingDao.findAll();
    }

    public Booking getById(Long id) {
        return bookingDao.findById(id).get();
    }

    public void deleteById(Long id) {
        bookingDao.deleteById(id);
    }

    public List<Booking> getBookingsByUsername(String username) {
        return bookingDao.findByUsername(username);
    }

    public List<Movie> getMoviesByBookingId(Long id) {
        return bookingDao.findMoviesByBookingId(id);
    }

    public List<Show> getShowsByBookingId(Long id) {
        return bookingDao.findShowsByBookingId(id);
    }
}
