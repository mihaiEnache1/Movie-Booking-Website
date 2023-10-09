import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Show } from '../_model/show';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowService {

  constructor(private httpClient: HttpClient) { }

  public addShow(show: Show, movieId: number, screenId: number) {
    return this.httpClient.post<Show>("http://localhost:8080/addShow/" + movieId + '/' + screenId + '/save', show);
  }

  public getShows() {
    return this.httpClient.get<Show[]>("http://localhost:8080/getShows")
  }

  public deleteShow(id: number) {
    return this.httpClient.delete("http://localhost:8080/deleteShow/" + id);
  }

  public getShowById(id: any): Observable<Show> {
    return this.httpClient.get<Show>("http://localhost:8080/getShowById/" + id).pipe(
      map((response: any) => response as Show),
      catchError((error: any) => {
        console.log(error);
        return throwError(error);
      })
    );
  }

  public getShowsByMovie(id: number) {
    return this.httpClient.get<Show[]>("http://localhost:8080/getShowsByMovie/" + id);
  }
}
