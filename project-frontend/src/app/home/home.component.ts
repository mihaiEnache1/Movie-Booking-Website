import { Component, OnInit } from '@angular/core';
import { MovieService } from '../service/movie.service';
import { Movie } from '../_model/movie';
import { map } from 'rxjs';
import { ImageProcessingService } from '../image-processing.service';
import { Router } from '@angular/router';
import { UserAuthService } from '../service/user-auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  movieDetails: any = [];
  pageNumber: number = 0;
  showLoadButton = false;
  movieNotifications: string[] = [];

  constructor(private movieService: MovieService, private imageProcessingService: ImageProcessingService,
      private router: Router, private userAuthService: UserAuthService) { }

  ngOnInit(): void {
    this.getMovies();
  }

  public getMovies(searchKey: string = "") {
    this.movieService.getMovies(this.pageNumber, searchKey)
    .pipe(
      map((x: Movie[], i) => x.map((movie: Movie) => this.imageProcessingService.createImage(movie)))
    )
    .subscribe(
      (response) => {
        if (response.length == 5) {
          this.showLoadButton = true;
        } else {
          this.showLoadButton = false;
        }
        response.forEach(m => this.movieDetails.push(m));
      },
      (error) => {
        console.log(error);
      }
    );
  }

  showMovieDetails(id: any) {
    this.router.navigate(['/movieView', {id: id}])
  }

  loadMoreMovies() {
    this.pageNumber = this.pageNumber + 1;
    this.getMovies();
  }

  searchMovie(searchkeyword: any) {
    this.pageNumber = 0;
    this.movieDetails = [];
    this.getMovies(searchkeyword);
  }
}
