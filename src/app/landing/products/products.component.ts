import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsResponse } from 'src/app/interfaces/products-response';
import { CartService } from 'src/app/service/cart.service';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products;
  stars=[1,2,3,4,5];
  rating=0;
  hoverState=0;
  
  constructor(private activatedRoute:ActivatedRoute,private cartservice:CartService) {
    this.activatedRoute.data.subscribe((res:{products:ProductsResponse})=>{
      this.products=res.products;
    });
   }

  ngOnInit(): void {
    this.products.products=this.products.products.map(product=>{
      if(product._id===localStorage.getItem(product.name)){
        return {...product,isFavourite:true};
      }
      else{
        return {...product,isFavourite:false};
      }
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

  addToWishlist(id:string,name:string,i:number){
    if(localStorage.getItem(name)){
      localStorage.removeItem(name);
    }
    else{
      localStorage.setItem(name,id);
    }
    this.products.products[i].isFavourite=!this.products.products[i].isFavourite;
  }


}
