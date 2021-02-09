import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../service/order.service';
import { ActivatedRoute } from '@angular/router';
interface PopularResponse{
  images:{
    images:string[]
  }
}

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.css']
})
export class PopularComponent implements OnInit {

  images:string[];
  imageObject=[];
  constructor(private activatedRoute:ActivatedRoute) { 
    this.activatedRoute.data.subscribe((res:PopularResponse)=>{
      this.images=res.images.images;
    });
  }

  ngOnInit(): void {
      for(let img of this.images){
        this.imageObject.push({thumbImage:`https://ecommerce-app-semir.herokuapp.com/${img}`,
        image:`https://ecommerce-app-semir.herokuapp.com/${img}`});
      }
    }

}
