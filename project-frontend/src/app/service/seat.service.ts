import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Seat } from '../_model/seat';

@Injectable({
  providedIn: 'root'
})
export class SeatService {

  constructor(private httpClient: HttpClient) { }

  public addSeat(seat: Seat, screenId: number) {
    return this.httpClient.post<Seat>("http://localhost:8080/addSeat/" + screenId, seat);
  }

  public getSeatById(seatId: any) {
    return this.httpClient.get<Seat>("http://localhost:8080/getSeatById/" + seatId);
  }

  public getSeatsByShow(showId: number) {
    return this.httpClient.get<Seat[]>("http://localhost:8080/getSeatsByShowId/" + showId);
  }

  public updateSeats(seats: Seat[], bookingId: number, showId: number) {
    return this.httpClient.put<Seat[]>("http://localhost:8080/updateSeats/" + bookingId + "/" + showId, seats);
  }
}
