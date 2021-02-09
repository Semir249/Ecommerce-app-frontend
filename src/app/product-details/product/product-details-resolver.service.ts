import { Injectable } from '@angular/core';
import { Resolve,ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { ProductDetailsResponse } from '../../interfaces/product-details-response';
import { ProductService } from 'src/app/service/product.service';

@Injectable({
  providedIn: 'root'
})
export class ProductDetailsResolverService implements Resolve<any>{

  
  constructor(private productservice:ProductService) {
    
   }

  resolve(route:ActivatedRouteSnapshot){
    return this.productservice.getProduct(route.paramMap.get('id'));
  }
}
