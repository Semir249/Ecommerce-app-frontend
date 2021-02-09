import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { GetProfileResponse } from '../interfaces/my-profile-response';
import { MyReviewsResponse } from '../interfaces/my-review-response';
interface EditProfile{
  email:string,
  username:string,
  birthday:string,
  location:string,
  zipcode:string
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  host=environment.apiUrl;

  constructor(private http:HttpClient) { }

  getProfile(){
    return this.http.get<GetProfileResponse>(`${this.host}/profile`);
  }

  getMyReview(){
    return this.http.get<MyReviewsResponse>(`${this.host}/my-review`);
  }

  editProfile(editedProfile:EditProfile){
    return this.http.put<{token:string,message:string}>(`${this.host}/profile`,editedProfile);
  }

}
