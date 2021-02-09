import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/service/product.service';
import { ProductsResponse } from '../../interfaces/products-response';
@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products:ProductsResponse;

  constructor(private route:ActivatedRoute,private productservice:ProductService) {
    this.route.data.subscribe((res:{products:ProductsResponse})=>{
      this.products=res.products;
    });
   }

  ngOnInit(): void {
    sessionStorage.clear();
  }

  deleteProduct(id:string){
    this.productservice.deleteProduct(id).subscribe({
      next:(res)=>{
        window.location.reload();
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

}
