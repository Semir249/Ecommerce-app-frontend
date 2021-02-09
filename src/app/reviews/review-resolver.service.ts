import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot,Resolve } from '@angular/router';
import { MyReviewsResponse } from '../interfaces/my-review-response';
import { ProfileService } from '../service/profile.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewResolverService implements Resolve<MyReviewsResponse>{

  constructor(private profileservice:ProfileService) { }

  resolve(route:ActivatedRouteSnapshot){
    return this.profileservice.getMyReview();
  }

}
