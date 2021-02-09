import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,Resolve } from '@angular/router';
import { CartService } from '../service/cart.service';
@Injectable({
  providedIn: 'root'
})
export class CartResolverService implements Resolve<any> {

  constructor(private cartservice:CartService) { }

  resolve(route:ActivatedRouteSnapshot){
    return this.cartservice.getCart();
  }
}
