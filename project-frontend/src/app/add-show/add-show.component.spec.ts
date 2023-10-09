import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShowComponent } from './add-show.component';

describe('AddShowComponent', () => {
  let component: AddShowComponent;
  let fixture: ComponentFixture<AddShowComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddShowComponent]
    });
    fixture = TestBed.createComponent(AddShowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
