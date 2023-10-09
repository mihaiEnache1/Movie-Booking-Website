import { Component, OnInit } from '@angular/core';
import { Movie } from '../_model/movie';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthService } from '../service/user-auth.service';
import { Decorator } from './decorator';
import { RatingDecorator } from './rating-decorator';

@Component({
  selector: 'app-movie-view-details',
  templateUrl: './movie-view-details.component.html',
  styleUrls: ['./movie-view-details.component.css']
})
export class MovieViewDetailsComponent implements OnInit {
  movie!: Movie;
  ratingDecorator!: Decorator;

  constructor(private userAuthService: UserAuthService, private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.movie = this.activatedRoute.snapshot.data['movie']
    this.ratingDecorator = new RatingDecorator();
    this.ratingDecorator.setIcon(this.movie.rating);
  }

  public isClient() {
    return !this.userAuthService.isLoggedOut() && !this.userAuthService.isAdmin();
  }

  public bookMovie() {
    this.router.navigate(['/bookMovie', {id: this.movie.id}])
  }

  public watchTrailer() {
    this.router.navigate(['/trailer', {id: this.movie.id}])
  }
}
