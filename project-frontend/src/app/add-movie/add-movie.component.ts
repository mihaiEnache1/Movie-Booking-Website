import { Component, OnInit } from '@angular/core';
import { Movie } from '../_model/movie';
import { NgForm } from '@angular/forms';
import { MovieService } from '../service/movie.service';
import { HttpErrorResponse } from '@angular/common/http';
import { FileHandle } from '../_model/file-handle';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {
  isNewMovie = true;
  movie: Movie = {
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

  constructor (private movieService: MovieService, private sanitizier: DomSanitizer, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.movie = this.activatedRoute.snapshot.data['movie'];
    if (this.movie && this.movie.id != 0) {
      this.isNewMovie = false;
    }
  }

  addMovie(movieForm: NgForm) {
    const movieFormData = this.prepareFormData(this.movie);
    if (this.isNewMovie) {
      this.movieService.addMovie(movieFormData).subscribe(
        (response: Movie) => {
          movieForm.reset();
          this.movie.movieImages = [];
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
    } else {
      this.movieService.updateMovie(movieFormData).subscribe(
        (response: Movie) => {
          movieForm.reset();
          this.movie.movieImages = [];
        }
      )
    }
  }

  prepareFormData(movie: Movie): FormData {
    const formData = new FormData();
    formData.append(
      'movie', 
      new Blob([JSON.stringify(movie)], {type: 'application/json'})
    );
    for (var i = 0; i < movie.movieImages.length; i++) {
      formData.append(
        "imageFile",
        movie.movieImages[i].file,
        movie.movieImages[i].file.name
      );
    }

    return formData;
  }

  onFileSelected(event: any) {
    if (event.target.files) {
      const file = event.target.files[0];
      const fileHandle: FileHandle = {
        file: file,
        url: this.sanitizier.bypassSecurityTrustUrl(
          window.URL.createObjectURL(file)
        )
      }
      this.movie.movieImages.push(fileHandle);
    }
  }

  removeImages(i: number) {
    this.movie.movieImages.splice(i, 1);
  }

  fileDropped(fileHandle: FileHandle) {
    this.movie.movieImages.push(fileHandle);
  }

}
