import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowMovieDetailsComponent } from './show-movie-details.component';

describe('ShowMovieDetailsComponent', () => {
  let component: ShowMovieDetailsComponent;
  let fixture: ComponentFixture<ShowMovieDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowMovieDetailsComponent]
    });
    fixture = TestBed.createComponent(ShowMovieDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
