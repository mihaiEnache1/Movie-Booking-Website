import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Show } from '../_model/show';
import { ShowService } from '../service/show.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Movie } from '../_model/movie';
import { MovieService } from '../service/movie.service';
import { Screen } from '../_model/screen';
import { ScreenService } from '../service/screen.service';
import { TheatreService } from '../service/theatre.service';
import { Theatre } from '../_model/theatre';

@Component({
  selector: 'app-add-show',
  templateUrl: './add-show.component.html',
  styleUrls: ['./add-show.component.css'],
  providers: [DatePipe]
})
export class AddShowComponent implements OnInit {
  isNewShow = true;
  show: Show = {
    id: 0,
    startTime: ""
  }
  movies: Movie[] = [];
  movie!: Movie;
  screens: Screen[] = [];
  screen!: Screen;
  theatres: Theatre[] = [];
  theatre!: Theatre;

  constructor(private showService: ShowService, private movieService: MovieService, 
              private screenService: ScreenService, private theatreService: TheatreService, 
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.show = this.activatedRoute.snapshot.data['show'];
    if (this.show && this.show.id != 0) {
      this.isNewShow = false;
    }
    this.theatreService.getTheatres().subscribe(
      (response) =>{
        this.theatres = response;
      }
    )
    this.movieService.getMovieList().subscribe(
      (response) => {
        this.movies = response;
      }
    );
  }

  onTheatreSelectionChange() {
    if (this.theatre && this.theatre.id) {
      this.screenService.getScreensByTheatre(this.theatre.id).subscribe(
        (response) => {
          this.screens = response;
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
    } else {
      this.screens = [];
    }
  }

  addShow(showForm: NgForm) {
    this.showService.addShow(this.show, this.movie.id, this.screen.id).subscribe(
      (response: Show) => {
        showForm.reset();
        this.show.startTime = ""
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

}
