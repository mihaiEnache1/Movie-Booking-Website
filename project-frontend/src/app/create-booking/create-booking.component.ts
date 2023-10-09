import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Theatre } from '../_model/theatre';
import { Screen } from '../_model/screen';
import { TheatreService } from '../service/theatre.service';
import { ScreenService } from '../service/screen.service';
import { Show } from '../_model/show';
import { ShowService } from '../service/show.service';
import { Movie } from '../_model/movie';
import { ActivatedRoute } from '@angular/router';
import { Seat } from '../_model/seat';
import { SeatService } from '../service/seat.service';
import { BookingService } from '../service/booking.service';
import { Booking } from '../_model/booking';
import { HttpErrorResponse } from '@angular/common/http';

interface SelectedOrTakenSeat {
  available: boolean;
  selected: boolean;
  taken: boolean;
  seatNumber: string;
}

@Component({
  selector: 'app-create-booking',
  templateUrl: './create-booking.component.html',
  styleUrls: ['./create-booking.component.css']
})
export class CreateBookingComponent implements OnInit {
  theatres: Theatre[] = [];
  theatre!: Theatre;
  screen!: Screen;
  shows: Show[] = [];
  show!: Show;
  movie!: Movie;
  seats: Seat[] = [];
  selectedSeatsCount = 0;
  selectedOrTakenSeats: SelectedOrTakenSeat[] = [];
  ready: boolean = false;
  booking: Booking = {
    id: 0,
    noOfSeats: 0,
    bookingDate: new Date(),
    totalCost: 0
  }
  username!: string;

  constructor(private theatreService: TheatreService, private activatedRoute: ActivatedRoute, private seatService: SeatService,
              private screenService: ScreenService, private showService: ShowService, private bookingService: BookingService) 
  {
    
  }

  ngOnInit(): void {
    this.theatreService.getTheatres().subscribe(
      (response) => {
        this.theatres = response;
      }
    )
    this.movie = this.activatedRoute.snapshot.data['movie']
    this.showService.getShowsByMovie(this.movie.id).subscribe(
      (response) => {
        this.shows = response;
      }
    )
    const username = localStorage.getItem('username');
    if (username) {
      this.username = username;
    }
  }

  onTheatreSelectionChange() {
    if (this.theatre && this.theatre.id) {
      this.onShowSelectionChange();
    }
  }

  onShowSelectionChange() {
    this.selectedOrTakenSeats = [];
    if (this.show && this.show.id) {
      this.screenService.getScreensByTheatre(this.theatre.id).subscribe(
        (response) => {
          this.seatService.getSeatsByShow(this.show.id).subscribe(
            (response) => {
              this.seats = response;
              this.setSeatsStatus(this.seats);
            }
          )
        }
      );
    }
  }

  setSeatsStatus(seats: Seat[]) {
    for (let i=0; i<seats.length; i++) {
      this.selectedOrTakenSeats.push({available: seats[i].isAvailable, selected: false, taken: !seats[i].isAvailable, seatNumber: seats[i].seatNumber})
    }
    this.ready = true;
  }

  toggleSeatSelection(seat: SelectedOrTakenSeat) {
    if (!seat.taken) {
      seat.selected = !seat.selected;
      this.seats.forEach((s) => {
        if (s.seatNumber === seat.seatNumber) {
          s.isAvailable = !s.isAvailable;
        }
      })
      this.updateSelectedCount();
    }
  }

  updateSelectedCount() {
    this.selectedSeatsCount = this.selectedOrTakenSeats.filter(seat => seat.selected).length;
  }


  addBooking(bookingForm: NgForm) {
    this.booking.totalCost = this.selectedSeatsCount * this.movie.price;
    this.booking.noOfSeats = this.selectedSeatsCount;
    this.bookingService.addBooking(this.booking, this.username, this.show.id, this.movie.id).subscribe(
      {
        next: (booking: Booking) => {
          this.seatService.updateSeats(this.seats, booking.id, this.show.id).subscribe(
            (response) => {
              console.log(response)
              window.location.reload();
            }, 
            (error: HttpErrorResponse) => {
              console.log(error.message)
            }
          )
        }
      }
    )
  }
}
