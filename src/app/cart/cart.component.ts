import { Component, OnInit } from '@angular/core';
import { CartResponse } from '../interfaces/cart-response';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../service/product.service';
import { ProductDetailsResponse } from '../interfaces/product-details-response';
import { CartService } from '../service/cart.service';
import { OrderService } from '../service/order.service';
import { AppComponent } from '../app.component';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cart:CartResponse;
  selectedAmount=[];
  total=0;
  constructor(private activatedroute:ActivatedRoute,private productservice:ProductService,
    private cartservice:CartService,private orderservice:OrderService) {
    activatedroute.data.subscribe((res:{cart:CartResponse})=>{
      this.cart=res.cart;
    });
    
   }

  ngOnInit(): void {
    this.cart.cart.forEach(item=>{
      this.selectedAmount.push(item.quantity);
    });
    this.total=this.cart.cart.reduce( (accumulator, product) =>{
          return accumulator + (product.quantity*product.price);
        }, 0);
        
  }

  editCart(event:Event,index:string){
    event.preventDefault();
     this.cartservice.editCart({id:this.cart.cart[index].productId,quantity:this.selectedAmount[index]}).subscribe(res=>{
      console.log(res);
      window.location.reload();
    })
  }

  deleteCartItem(id:string){
    this.cartservice.deleteCartItem(id).subscribe(res=>{
      window.location.reload();
      console.log(res);
    })
  }

  OrderItems(){
    this.orderservice.postOrder().subscribe(res=>{
    
      console.log(res);
      window.location.reload();
    })
  }

  

}
