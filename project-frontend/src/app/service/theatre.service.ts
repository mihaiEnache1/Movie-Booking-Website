import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Theatre } from '../_model/theatre';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TheatreService {

  constructor(private httpClient: HttpClient) { }

  public addTheatre(theatre: Theatre) {
    return this.httpClient.post<Theatre>("http://localhost:8080/addTheatre", theatre);
  }

  public getTheatres() {
    return this.httpClient.get<Theatre[]>("http://localhost:8080/getTheatres")
  }

  public deleteTheatre(id: number) {
    return this.httpClient.delete("http://localhost:8080/deleteTheatre/" + id);
  }

  public getTheatreById(id: any): Observable<Theatre> {
    return this.httpClient.get<Theatre>("http://localhost:8080/getTheatreById/" + id).pipe(
      map((response: any) => response as Theatre),
      catchError((error: any) => {
        console.log(error);
        return throwError(error);
      })
    );
  }
}
