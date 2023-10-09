import { TestBed } from '@angular/core/testing';

import { ScreenResolveService } from './screen-resolve.service';

describe('ScreenResolveService', () => {
  let service: ScreenResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScreenResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
