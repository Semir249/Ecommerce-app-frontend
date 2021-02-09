import { TestBed } from '@angular/core/testing';

import { EditProductResolverService } from './edit-product-resolver.service';

describe('EditProductResolverService', () => {
  let service: EditProductResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditProductResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
