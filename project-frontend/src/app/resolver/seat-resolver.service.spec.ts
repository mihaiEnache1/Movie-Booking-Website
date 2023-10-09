import { TestBed } from '@angular/core/testing';

import { SeatResolverService } from './seat-resolver.service';

describe('SeatResolverService', () => {
  let service: SeatResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeatResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
