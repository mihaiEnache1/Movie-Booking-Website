import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { Screen } from '../_model/screen';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  constructor(private httpClient: HttpClient) { }

  public addScreen(screen: Screen, id: number) {
    return this.httpClient.post<Screen>("http://localhost:8080/addScreen/" + id + "/save", screen);
  }

  public getScreens() {
    return this.httpClient.get<Screen[]>("http://localhost:8080/getScreens")
  }

  public deleteScreen(id: number) {
    return this.httpClient.delete("http://localhost:8080/deleteScreen/" + id);
  }

  public getScreenById(id: any): Observable<Screen> {
    return this.httpClient.get<Screen>("http://localhost:8080/getScreenById/" + id).pipe(
      map((response: any) => response as Screen),
      catchError((error: any) => {
        console.log(error);
        return throwError(error);
      })
    );
  }

  public getScreensByTheatre(id: number) {
    return this.httpClient.get<Screen[]>("http://localhost:8080/getScreensByTheatre/" + id);
  }
}
