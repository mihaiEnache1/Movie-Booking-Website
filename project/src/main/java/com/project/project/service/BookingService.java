package com.project.project.service;

import com.project.project.dao.BookingDao;
import com.project.project.entity.Booking;
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
}
