import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MyReviewsResponse } from '../interfaces/my-review-response';
import { ProductService } from '../service/product.service';
interface EditProductReview{
  reviewId:string,
  id:string,
  comment?:string,
  stars:number
}
@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  myReviews:MyReviewsResponse;
  stars=[1,2,3,4,5];
  rating=0;
  hoverState=0;

  constructor(private route:ActivatedRoute,private productservice:ProductService) {
    this.route.data.subscribe((res:{myReviews:MyReviewsResponse})=>{
      this.myReviews=res.myReviews;
    });
   }

  ngOnInit(): void {
    
  }

  editReview(index:number){
    this.myReviews.reviews[index].edit=true;
    this.hoverState=this.myReviews.reviews[index].stars;
    this.rating=this.myReviews.reviews[index].stars;
  }

  deleteReview(prodId:string,reviewId:string){
    this.productservice.deleteMyReview(prodId,reviewId).subscribe({
      next:(res)=>{
        console.log(res);
        window.location.reload();
      },
      error:(err)=>{
        console.log(err);
      }
    })
  }

  onSubmit(editForm,index:number){
    var editedProductReview={
      reviewId:editForm.reviewId,
    id:editForm.id,
    ...(editForm.comment)?{comment:editForm.comment}:{},
    stars:this.rating
    }
    this.productservice.editProductReview(editedProductReview).subscribe({
      next:(res)=>{
        this.myReviews.reviews[index].edit=false;
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
