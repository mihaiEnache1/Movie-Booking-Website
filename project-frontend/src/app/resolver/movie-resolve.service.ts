import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Movie } from '../_model/movie'; 
import { Observable, map, of } from 'rxjs';
import { MovieService } from '../service/movie.service'; 
import { ImageProcessingService } from '../image-processing.service'; 

@Injectable({
  providedIn: 'root'
})
export class MovieResolveService implements Resolve<Movie>{

  constructor(private movieService: MovieService, private imageProcessingService: ImageProcessingService) { }

  resolve(route: ActivatedRouteSnapshot, state:RouterStateSnapshot): Observable<Movie> {
    const movieId = route.paramMap.get("id");
    if (movieId) {
      // fetch details from backend
      return this.movieService.getMovieById(movieId).pipe(
        map(m => this.imageProcessingService.createImage(m))
      );
    } else {
      return of(this.getMovieDetails());
    }
  }

  getMovieDetails() {
    return {
      id: 0,
      title: "",
      genre: "",
      duration: "",
      description: "",
      language: "",
      rating: 0,
      movieImages: [],
      price: 0,
      trailerVideoId: ""
    }
  }
}
