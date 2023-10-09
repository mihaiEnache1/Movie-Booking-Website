import { Injectable } from '@angular/core';
import { Show } from '../_model/show';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ShowService } from '../service/show.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowResolveService implements Resolve<Show> {

  constructor(private showService: ShowService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Show> {
    const showId = route.paramMap.get("id");
    if (showId) {
      return this.showService.getShowById(showId);
    } else {
      return of(this.getShowDetails());
    }
  }

  getShowDetails() {
    return {
      id: 0,
      startTime: ""
    }
  }
}
