import { TestBed } from '@angular/core/testing';

import { ReviewResolverService } from './review-resolver.service';

describe('ReviewResolverService', () => {
  let service: ReviewResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReviewResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
