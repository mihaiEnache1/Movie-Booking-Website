import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';
import { FileHandle } from './_model/file-handle';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
  selector: '[appDrag]'
})
export class DragDirective {
  @HostBinding("style.background") private background = "#eee";
  
  @Output() files: EventEmitter<FileHandle> = new EventEmitter();

  constructor(private sanitizier: DomSanitizer) { }

  @HostListener("dragover", ["$event"])
  public onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = "#999";
  }

  @HostListener("dragleave", ["$event"])
  public onDragLeave(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = "#eee";
  }

  @HostListener("drop", ["$event"])
  public onDrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = "#eee";

    let fileHandle: FileHandle;
    const file = evt.dataTransfer?.files[0];
    if (file) {
      const url = this.sanitizier.bypassSecurityTrustUrl(window.URL.createObjectURL(file));
      fileHandle = { file, url };
      this.files.emit(fileHandle);
    }
  }

}
