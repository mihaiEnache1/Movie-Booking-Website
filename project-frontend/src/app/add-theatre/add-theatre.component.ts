import { Component, OnInit } from '@angular/core';
import { Theatre } from '../_model/theatre';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { TheatreService } from '../service/theatre.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-theatre',
  templateUrl: './add-theatre.component.html',
  styleUrls: ['./add-theatre.component.css']
})
export class AddTheatreComponent implements OnInit {
  isNewTheatre = true;
  theatreId!: number;
  theatre: Theatre = {
    id: 0,
    name: ""
  }

  constructor(private theatreService: TheatreService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.theatre = this.activatedRoute.snapshot.data['theatre'];
    if (this.theatre && this.theatre.id != 0) {
      this.isNewTheatre = false;
    }
  }

  addTheatre(theatreForm: NgForm) {
    this.theatreService.addTheatre(this.theatre).subscribe(
      (response: Theatre) => {
        theatreForm.reset();
        this.theatre.name = '';
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

}
