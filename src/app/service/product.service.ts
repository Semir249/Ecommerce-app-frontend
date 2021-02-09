import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ProductsResponse } from '../interfaces/products-response';
import { ProductDetailsResponse } from '../interfaces/product-details-response';
import { ProductDetailsModule } from '../product-details/product-details.module';

interface ProductReview{
  id:string,
  comment?:string,
  stars:number
}

interface EditProductReview{
  reviewId:string,
  id:string,
  comment?:string,
  stars:number
}



@Injectable({
  providedIn: 'root'
})
export class ProductService {

  host=environment.apiUrl;
  constructor(private http:HttpClient) { }

  getProducts(){
    return this.http.get<ProductsResponse>(`${this.host}/product`);
  }

  getProduct(productid:string){
    return this.http.get<ProductDetailsResponse>(`${this.host}/product/${productid}`);
  }

  getProductReview(){
    return this.http.get(`${this.host}/product-review/5fe109a6db25894804ec4a75`);
  }

  addProduct(formData:FormData){
    return this.http.post(`${this.host}/product`,formData);
  }

  productReview(review:ProductReview){
    return this.http.post(`${this.host}/product-review`,review);
  }

  editProduct(formData:FormData,id:string){
    return this.http.put(`${this.host}/product/${id}`,formData);
  }

  editProductReview(editedReview:EditProductReview){
    return this.http.put(`${this.host}/product-review`,editedReview);
  }

  deleteProduct(id:string){
    return this.http.delete(`${this.host}/product/${id}`);
  }

  deleteMyReview(id:string,reviewId:string){
    return this.http.delete(`${this.host}/my-review/?id=${id}&reviewId=${reviewId}`);
  }

}
