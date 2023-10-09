import { Component, OnInit } from '@angular/core';
import { Screen } from '../_model/screen';
import { Seat } from '../_model/seat';
import { SeatService } from '../service/seat.service';
import { ScreenService } from '../service/screen.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Show } from '../_model/show';
import { ShowService } from '../service/show.service';

@Component({
  selector: 'app-add-seat',
  templateUrl: './add-seat.component.html',
  styleUrls: ['./add-seat.component.css']
})
export class AddSeatComponent implements OnInit {
  isNewSeat = true;
  seat: Seat = {
    id: 0,
    seatNumber: "",
    isAvailable: true
  }
  shows: Show[] = [];
  show!: Show;

  constructor(private seatService: SeatService, private showService: ShowService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.seat = this.activatedRoute.snapshot.data['seat'];
    if (this.seat && this.seat.id != 0) {
      this.isNewSeat = false;
    }
    this.showService.getShows().subscribe(
      (response) => {
        this.shows = response;
      }
    )
  }

  addSeat(seatForm: NgForm) {
    this.seatService.addSeat(this.seat, this.show.id).subscribe(
      (response: Seat) => {
        seatForm.reset();
        this.seat.seatNumber = "";
        this.seat.isAvailable = true;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    )
  }
}
