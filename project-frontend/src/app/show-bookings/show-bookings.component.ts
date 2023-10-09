import { Component, OnInit } from '@angular/core';
import { BookingService } from '../service/booking.service';
import { Booking } from '../_model/booking';
import { Movie } from '../_model/movie';
import { MovieService } from '../service/movie.service';
import { Seat } from '../_model/seat';

class BookingDetails {
  bookingDate: Date;
  bookedBy: string;
  movieBooked: string;
  showTime: string;
  bookedSeats: Seat[];
  totalCost: number;

  constructor(bookingDate: Date, bookedBy: string, movieBooked: string, showTime: string, bookedSeats: Seat[], totalCost: number) {
    this.bookingDate = bookingDate;
    this.bookedBy = bookedBy;
    this.movieBooked = movieBooked;
    this.showTime = showTime;
    this.bookedSeats = bookedSeats;
    this.totalCost = totalCost;
  }
}

@Component({
  selector: 'app-show-bookings',
  templateUrl: './show-bookings.component.html',
  styleUrls: ['./show-bookings.component.css']
})
export class ShowBookingsComponent implements OnInit {
  userBookings: Booking[] = [];
  moviesBooked: Movie[] = [];
  username!: string;
  bookingDetails: BookingDetails[] = [];
  displayedColumns: string[] = ['Booking Date', 'Booked By', 'Movie Booked', 'Showtime', 'Booked Seats', 'Total Cost']
  showTable = false;

  constructor(private bookingService: BookingService, private movieService: MovieService) { }

  ngOnInit(): void {
    const username = localStorage.getItem('username');
    if (username) {
      this.username = username;
    }
    this.bookingService.getBookings(this.username).subscribe(
      (response) => {
        const usersBooking = response as any[];
        usersBooking.forEach((booking) => {
          this.bookingService.getMoviesByBookingId(booking.id).subscribe(
            (response) =>{
              const movies = response;
              this.bookingService.getShowsByBookingId(booking.id).subscribe(
                (response) => {
                  const shows = response;
                  usersBooking.forEach((booking) => {
                    movies.forEach((movie) => {
                      shows.forEach((show) => {
                        const bookingDetails = new BookingDetails(booking.bookingDate, this.username, movie.title, show.startTime, booking.seats, booking.totalCost);
                        this.bookingDetails.push(bookingDetails);
                      })
                    })
                  })
                  this.showTable = true;
                }
              )
            }
          )
        })
      }
    )
  }

}
