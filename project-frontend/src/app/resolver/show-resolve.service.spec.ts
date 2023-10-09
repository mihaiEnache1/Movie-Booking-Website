import { TestBed } from '@angular/core/testing';

import { ShowResolveService } from './show-resolve.service';

describe('ShowResolveService', () => {
  let service: ShowResolveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShowResolveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
