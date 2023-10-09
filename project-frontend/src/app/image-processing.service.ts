import { Injectable } from '@angular/core';
import { Movie } from './_model/movie';
import { FileHandle } from './_model/file-handle';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class ImageProcessingService {

  constructor(private sanitizer: DomSanitizer) { }

  public createImage(movie: Movie) {
    const movieImages: any[] = movie.movieImages;
    const movieImagesToFileHandle: FileHandle[] = [];
    for (let i = 0; i < movieImages.length; i++) {
      const imageFileData = movieImages[i];
      const imageBlob = this.dataURIToBlob(imageFileData.picByte, imageFileData.type);
      const imageFile = new File([imageBlob], imageFileData.name, {type: imageFileData.type});
      const finalFileHandle: FileHandle = {
        file: imageFile,
        url: this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(imageFile))
      };
      movieImagesToFileHandle.push(finalFileHandle);
    }

    movie.movieImages = movieImagesToFileHandle;
    return movie;
  }

  public dataURIToBlob(picBytes: any, imageType: any) {
    const byteString = window.atob(picBytes);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: imageType });
    return blob;
  }
}
