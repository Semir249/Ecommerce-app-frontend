import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
interface newUser{
  email:string,
  password:string,
  username:string,
  birthday:string,
  location:string,
  zipcode:string
}
@Injectable({
  providedIn: 'root'
})
export class SignupService {

  host=environment.apiUrl;
  constructor(private http:HttpClient) { }

  signup(newUser:newUser){
    return this.http.post(`${this.host}/signup`,newUser);
  }

}
