import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CartResponse } from '../interfaces/cart-response';
interface AddToCart{
  id:string,
  quantity:number
}
interface EditCart{
  id:string,
  quantity:number
}
@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  host=environment.apiUrl;
  
  constructor(private http:HttpClient) { }

  getCart(){
    return this.http.get<CartResponse>(`${this.host}/cart`);
  }

  addToCart(item:AddToCart){
    return this.http.post(`${this.host}/cart`,item);
  }

  editCart(item:EditCart){
    return this.http.patch(`${this.host}/cart`,item);
  }

  deleteCartItem(id:string){
    return this.http.delete(`${this.host}/cart/${id}`);
  }

  deleteCart(){
    return this.http.delete(`${this.host}/cart`);
  }
}
