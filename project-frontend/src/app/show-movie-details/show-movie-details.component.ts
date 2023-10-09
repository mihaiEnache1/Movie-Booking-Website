import { Component, OnInit } from '@angular/core';
import { MovieService } from '../service/movie.service';
import { Movie } from '../_model/movie';
import { MatDialog } from '@angular/material/dialog';
import { ShowMovieImageComponent } from '../show-movie-image/show-movie-image.component';
import { ImageProcessingService } from '../image-processing.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-show-movie-details',
  templateUrl: './show-movie-details.component.html',
  styleUrls: ['./show-movie-details.component.css']
})
export class ShowMovieDetailsComponent implements OnInit {
  movieDetails: Movie[] = [];
  displayedColumns: string[] = ['Title', 'Description', 'Genre', 'Duration', 'Language', 'Rating', 'Price', 'Image', 'Edit', 'Delete'];
  pageNumber: number = 0;
  showTable = false;
  showLoadButton = false;

  constructor (private movieService: MovieService, public dialog: MatDialog, private imageProcessingService: ImageProcessingService,
    private router: Router) { }

  ngOnInit(): void {
    this.getMovieS();
  }

  public getMovieS() {
    this.showTable = false;
    this.movieService.getMovies(this.pageNumber).pipe(
      map((x: Movie[], i: any) => x.map((movie: Movie) => this.imageProcessingService.createImage(movie)))
    ).subscribe(
      (response) => {
        response.forEach(m => this.movieDetails.push(m));
        this.showTable = true;
        if (response.length == 5) {
          this.showLoadButton = true;
        } else {
          this.showLoadButton = false;
        }
      },
      (error) => {
        console.log(error);
      }
    )
  }

  deleteMovie(id: number) {
    this.movieService.deleteMovie(id).subscribe(
      (response) => {
        window.location.reload();
      }, 
      (error) => {
        console.log(error);
      }
    )
  }

  editMovie(id: number) {
    this.router.navigate(['/add', {id: id}])
  }

  showImage(movie: Movie) {
    this.dialog.open(ShowMovieImageComponent, {
      data: {
        images: movie.movieImages
      },
      height: '500px',
      width: '500px'
    });
  }

  loadMoreMovies() {
    this.pageNumber = this.pageNumber + 1;
    this.getMovieS();
  }

}
