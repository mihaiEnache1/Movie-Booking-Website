import { Injectable } from '@angular/core';
import { Seat } from '../_model/seat';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { SeatService } from '../service/seat.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeatResolverService implements Resolve<Seat> {

  constructor(private seatService: SeatService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Seat> {
    const seatId = route.paramMap.get("id");
    if (seatId) {
      return this.seatService.getSeatById(seatId);
    } else {
      return of(this.getSeatDetails());
    }
  }

  getSeatDetails() {
    return {
      id: 0,
      seatNumber: "",
      isAvailable: true
    }
  }
}
