package com.project.project.dataaccess.dao;

import com.project.project.entity.Seat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SeatDao extends JpaRepository<Seat, Long> {
    List<Seat> getSeatsByBookingId(Long id);
    List<Seat> getSeatsByShowId(Long id);
}
