import { TestBed } from '@angular/core/testing';

import { TheatreResolveService } from './theatre-resolve.service';

describe('TheatreResolveService', () => {
  let service: TheatreResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TheatreResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
