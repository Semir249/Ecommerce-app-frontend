import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsResponse } from '../interfaces/products-response';
import { CartService } from '../service/cart.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  products:ProductsResponse;
  stars=[1,2,3,4,5];
  rating=0;
  hoverState=0;
  
  constructor(private activatedRoute:ActivatedRoute,private cartservice:CartService) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((res:{products:ProductsResponse})=>{
      this.products=res.products;
    });
  }

  onStarEnter(starId:number){
    this.hoverState=starId;
  }

  onStarLeave(){
    this.hoverState=0;
  }

  onStarClicked(starId:number){
    this.rating=starId;
  }

  addToCart(productId:string){
  
    this.cartservice.addToCart({id:productId,quantity:1})
    .subscribe(res=>{
      console.log(res);
    });
  }

}
