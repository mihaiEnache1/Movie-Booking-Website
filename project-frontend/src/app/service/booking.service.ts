import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Booking } from '../_model/booking';
import { Movie } from '../_model/movie';
import { Show } from '../_model/show';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(private httpClient: HttpClient) { }

  addBooking(booking: Booking, username: string, showId: number, movieId: number) {
    return this.httpClient.post<Booking>("http://localhost:8080/addBooking/" + username + '/' + showId + '/' + movieId + '/save', booking);
  }

  getBookings(username: string) {
    return this.httpClient.get<Booking[]>("http://localhost:8080/getBookingsByUsername/" + username);
  }

  getMoviesByBookingId(id: number) {
    return this.httpClient.get<Movie[]>("http://localhost:8080/getMoviesByBookingId/" + id);
  }

  getShowsByBookingId(id: number) {
    return this.httpClient.get<Show[]>("http://localhost:8080/getShowsByBookingId/" + id);
  }
}
