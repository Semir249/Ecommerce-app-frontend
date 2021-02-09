import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { ProductService } from '../../service/product.service';

@Injectable({
  providedIn: 'root'
})
export class EditProductResolverService implements Resolve<any> {
  constructor(private router:Router,private productservice:ProductService) {
    
   }

  resolve(route:ActivatedRouteSnapshot,state:RouterStateSnapshot){
  if(sessionStorage.getItem('item')){
    return this.productservice.getProduct(JSON.parse(sessionStorage.getItem('item')));
  }
  else{
    sessionStorage.setItem('item', JSON.stringify(this.router.getCurrentNavigation().extras.state.id));
    return this.productservice.getProduct(this.router.getCurrentNavigation().extras.state.id);
  }
  }
}
