import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from '../_model/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private httpClient: HttpClient) { }

  public addMovie(movie: FormData) {
    return this.httpClient.post<Movie>("http://localhost:8080/addMovie", movie);
  }

  public getMovies(pageNumber: number, searchkeyword: string = "") {
    return this.httpClient.get<Movie[]>("http://localhost:8080/getMovies?pageNumber=" + pageNumber + "&searchKey=" + searchkeyword);
  }

  public getMovieList() {
    return this.httpClient.get<Movie[]>("http://localhost:8080/getAllMovies");
  }

  public deleteMovie(id: number) {
    return this.httpClient.delete("http://localhost:8080/deleteMovie/" + id);
  }

  public getMovieById(id: any) {
    return this.httpClient.get<Movie>("http://localhost:8080/getMovieById/" + id);
  }

  public updateMovie(movie: FormData) {
    return this.httpClient.post<Movie>("http://localhost:8080/updateMovie", movie);
  }
}
