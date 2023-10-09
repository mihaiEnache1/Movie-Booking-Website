import { Component, OnInit } from '@angular/core';
import { Movie } from '../_model/movie';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trailer',
  templateUrl: './trailer.component.html',
  styleUrls: ['./trailer.component.css']
})
export class TrailerComponent implements OnInit {
  movie!: Movie;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.movie = this.activatedRoute.snapshot.data['movie']
    const tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    document.body.appendChild(tag);
  }
}
