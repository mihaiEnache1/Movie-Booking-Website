import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Theatre } from '../_model/theatre'; 
import { TheatreService } from '../service/theatre.service'; 
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TheatreResolveService implements Resolve<Theatre> {

  constructor(private theatreService: TheatreService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Theatre> {
    const theatreId = route.paramMap.get("id");
    if (theatreId) {
      return this.theatreService.getTheatreById(theatreId);
    } else {
      return of(this.getTheatreDetails());
    }
  }

  getTheatreDetails() {
    return {
      id: 0,
      name: ""
    }
  }
}
