import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieViewDetailsComponent } from './movie-view-details.component';

describe('MovieViewDetailsComponent', () => {
  let component: MovieViewDetailsComponent;
  let fixture: ComponentFixture<MovieViewDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MovieViewDetailsComponent]
    });
    fixture = TestBed.createComponent(MovieViewDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
