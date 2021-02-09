import { TestBed } from '@angular/core/testing';

import { ProductDetailsResolverService } from './product-details-resolver.service';

describe('ProductDetailsResolverService', () => {
  let service: ProductDetailsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductDetailsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
