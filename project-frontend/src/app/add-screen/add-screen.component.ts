import { Component, OnInit } from '@angular/core';
import { Screen } from '../_model/screen';
import { ActivatedRoute } from '@angular/router';
import { ScreenService } from '../service/screen.service';
import { NgForm } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { TheatreService } from '../service/theatre.service';
import { Theatre } from '../_model/theatre';

@Component({
  selector: 'app-add-screen',
  templateUrl: './add-screen.component.html',
  styleUrls: ['./add-screen.component.css']
})
export class AddScreenComponent implements OnInit {
  isNewScreen = true;
  screen: Screen = {
    id: 0,
    name: "",
    capacity: 0
  }
  theatres: Theatre[] = [];
  theatre!: Theatre;

  constructor(private screenService: ScreenService, private theatreService: TheatreService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.screen = this.activatedRoute.snapshot.data['screen'];
    if (this.screen && this.screen.id != 0) {
      this.isNewScreen = false;
    }
    this.theatreService.getTheatres().subscribe(
      (response) => {
        this.theatres = response;
      }
    );
  }

  addScreen(screenForm: NgForm) {
    this.screenService.addScreen(this.screen, this.theatre.id).subscribe(
      (response: Screen) => {
        screenForm.reset();
        this.screen.name = '';
        this.screen.capacity = 0;
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

}
