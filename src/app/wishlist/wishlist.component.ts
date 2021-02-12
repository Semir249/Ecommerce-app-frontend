import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsResponse } from '../interfaces/products-response';
import { CartService } from '../service/cart.service';
import { ProductService } from '../service/product.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  products=[];
  stars=[1,2,3,4,5];
  rating=0;
  hoverState=0;
  wishListEmpty=(localStorage.length===1 && localStorage.getItem('token')) || localStorage.length===0;
  constructor(private activatedroute:ActivatedRoute,private cartservice:CartService,private productservice:ProductService) {
   }

  ngOnInit(): void {
    for (var i = 0; i < localStorage.length; i++){
      if(localStorage.key(i)!=='token'){
      this.productservice.getProduct(localStorage.getItem(localStorage.key(i))).subscribe({
       next:(res)=>{
         this.products.push(res);
         console.log(this.wishListEmpty);
       },
       error:(err)=>{
         console.log(err.error.message);
       }
      })  
      }
  }
    
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

  addToWishlist(name:string){
      localStorage.removeItem(name);
      window.location.reload()
  }

}
