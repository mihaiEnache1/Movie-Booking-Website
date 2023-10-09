package com.project.project.dataaccess.dao;

import com.project.project.entity.Booking;
import com.project.project.entity.Movie;
import com.project.project.entity.Show;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingDao extends CrudRepository<Booking, Long> {
    @Query("SELECT b FROM Booking b JOIN b.user u WHERE u.username = :username")
    List<Booking> findByUsername(@Param("username") String username);

    @Query("SELECT b.movie FROM Booking b WHERE b.id = :id")
    List<Movie> findMoviesByBookingId(@Param("id") Long id);

    @Query("SELECT b.show FROM Booking b WHERE b .id = :id")
    List<Show> findShowsByBookingId(@Param("id") Long id);
}
