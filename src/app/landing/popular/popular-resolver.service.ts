import { Injectable } from '@angular/core';
import { Resolve,ActivatedRouteSnapshot } from '@angular/router';
import { OrderService } from '../../service/order.service';

interface PopularResponse{
  images:{
    images:string[]
  }
}

@Injectable({
  providedIn: 'root'
})
export class PopularResolverService implements Resolve<PopularResponse> {

  constructor(private orderService:OrderService) { }

  resolve(route:ActivatedRouteSnapshot){
    return this.orderService.getPopular();
  }
}
