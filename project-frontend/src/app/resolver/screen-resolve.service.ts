import { Injectable } from '@angular/core';
import { ScreenService } from '../service/screen.service'; 
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Screen } from '../_model/screen'; 

@Injectable({
  providedIn: 'root'
})
export class ScreenResolveService implements Resolve<Screen> {

  constructor(private screenService: ScreenService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Screen> {
    const screenId = route.paramMap.get("id");
    if (screenId) {
      return this.screenService.getScreenById(screenId);
    } else {
      return of(this.getTheatreDetails());
    }
  }

  getTheatreDetails() {
    return {
      id: 0,
      name: "",
      capacity: 0,
    }
  }
}
