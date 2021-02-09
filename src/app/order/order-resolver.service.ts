import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { OrderService } from '../service/order.service';

@Injectable({
  providedIn: 'root'
})
export class OrderResolverService implements Resolve<any> {

  constructor(private orderservice:OrderService) { }

  resolve(route:ActivatedRouteSnapshot){
    return this.orderservice.getOrder();
  }
}
