import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSeatComponent } from './add-seat.component';

describe('AddSeatComponent', () => {
  let component: AddSeatComponent;
  let fixture: ComponentFixture<AddSeatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSeatComponent]
    });
    fixture = TestBed.createComponent(AddSeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
