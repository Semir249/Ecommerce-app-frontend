import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface PopularResponse{
  images:{
    images:string[]
  }
}

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  host=environment.apiUrl
  constructor(private http:HttpClient) { }

  getOrder(){
    return this.http.get(`${this.host}/order`);
  }

  getAllOrders(){
    return this.http.get(`${this.host}/all-orders`);
  }

  getPopular(){
    return this.http.get<PopularResponse>(`${this.host}/favourites`);
  }

  postOrder(){
    return this.http.post(`${this.host}/order`,{});
  }

}
