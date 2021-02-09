import { TestBed } from '@angular/core/testing';

import { Cart.ResolverService } from './cart.resolver.service';

describe('Cart.ResolverService', () => {
  let service: Cart.ResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cart.ResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
