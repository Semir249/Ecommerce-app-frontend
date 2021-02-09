import { Component, Input, OnInit,Output,EventEmitter } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailsResponse } from '../../interfaces/product-details-response';
import { ProductService } from 'src/app/service/product.service';

interface ProductReview{
  id:string,
  comment?:string,
  stars:number
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  imageObject=[];
  product:ProductDetailsResponse;
  productQuantity;
  selectedAmount=1;
  stars=[1,2,3,4,5];
  rating=0;
  hoverState=0;

  constructor(private activatedroute:ActivatedRoute,private cartservice:CartService,private productservice:ProductService){
    activatedroute.data.subscribe((res:{product:ProductDetailsResponse})=>{
      this.product=res.product;
    })
  }

  ngOnInit(): void {
    this.productQuantity = Array(this.product.product.quantity).fill(0).map((x,i)=>i);
    for(let img of this.product.product.images){
      this.imageObject.push({thumbImage:`https://ecommerce-app-semir.herokuapp.com/${img}`,
      image:`https://ecommerce-app-semir.herokuapp.com/${img}`});
    }
  }

  addToCart(){
    this.cartservice.addToCart({id:this.product.product._id,quantity:this.selectedAmount})
    .subscribe(res=>{
      console.log(res);
    });
  }

  onSubmit(reviewForm){
    var productReview={
      id:reviewForm.id,
      stars:this.rating,
      ...(reviewForm.comment)?{comment:reviewForm.comment}:{},
    };
    this.productservice.productReview(productReview).subscribe({
      next:(res)=>{
        window.location.reload();
      },
      error:(err)=>{
        console.log(err);
      }
    })
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


}
