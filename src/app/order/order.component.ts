import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GetOrderResponse } from '../interfaces/order-response';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  myOrders:GetOrderResponse;

  constructor(private activatedroute:ActivatedRoute) {
    this.activatedroute.data.subscribe((res:{myOrders:GetOrderResponse})=>{
      this.myOrders=res.myOrders;
    });
   }

  ngOnInit(): void {
  }

}
