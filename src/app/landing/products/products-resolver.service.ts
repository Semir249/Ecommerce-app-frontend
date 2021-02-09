import { Injectable } from '@angular/core';
import { ProductService } from '../../service/product.service';
import { Resolve,ActivatedRouteSnapshot } from '@angular/router';
import { ProductsResponse } from '../../interfaces/products-response';
@Injectable({
  providedIn: 'root'
})
export class ProductsResolverService implements Resolve<ProductsResponse>{

  constructor(private productservice:ProductService) { }

  resolve(route:ActivatedRouteSnapshot){
    return this.productservice.getProducts();
  }
}
