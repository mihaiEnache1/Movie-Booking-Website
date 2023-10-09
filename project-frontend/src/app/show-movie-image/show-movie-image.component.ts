import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileHandle } from '../_model/file-handle';

@Component({
  selector: 'app-show-movie-image',
  templateUrl: './show-movie-image.component.html',
  styleUrls: ['./show-movie-image.component.css']
})
export class ShowMovieImageComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
   this.receiveImages(); 
  }

  receiveImages() {
    console.log(this.data);
  }
}
