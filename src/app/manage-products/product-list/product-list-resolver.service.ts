import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { ProductsResponse } from 'src/app/interfaces/products-response';
import { ProductService } from 'src/app/service/product.service';
@Injectable({
  providedIn: 'root'
})
export class ProductListResolverService implements Resolve<ProductsResponse>  {

  constructor(private productservice:ProductService) { }

  resolve(route:ActivatedRouteSnapshot){
    return this.productservice.getProducts();
  }
}
