import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';



interface NewPassword{
  password:string,
  passwordToken:string  
}

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  host=environment.apiUrl;

  constructor(private http:HttpClient) { }

  resetPassword(email:string){
    return this.http.post<{message:string}>(`${this.host}/reset`,{email:email});
  }

  newPassword(newDetails:NewPassword){
    return this.http.post(`${this.host}/new-password`,newDetails);
  }

  changePassword(currentPassword:string,newPassword:string){
    return this.http.post<{message:string}>(`${this.host}/change-password`,{password:currentPassword,newPassword:newPassword});
  }
}
