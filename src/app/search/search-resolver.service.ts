import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,Resolve } from '@angular/router';
import { ProductsResponse } from '../interfaces/products-response';
import { ProductService } from '../service/product.service';
import { filter,switchMap,tap,map } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class SearchResolverService implements Resolve<ProductsResponse> {

  constructor(private productservice:ProductService) { }

  resolve(route:ActivatedRouteSnapshot){
    return this.productservice.searchProduct(route.queryParamMap.get('product'));
  }
}
