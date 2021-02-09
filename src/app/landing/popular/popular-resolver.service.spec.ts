import { TestBed } from '@angular/core/testing';

import { PopularResolverService } from './popular-resolver.service';

describe('PopularResolverService', () => {
  let service: PopularResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PopularResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
