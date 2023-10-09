import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMovieImageComponent } from './show-movie-image.component';

describe('ShowMovieImageComponent', () => {
  let component: ShowMovieImageComponent;
  let fixture: ComponentFixture<ShowMovieImageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowMovieImageComponent]
    });
    fixture = TestBed.createComponent(ShowMovieImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
