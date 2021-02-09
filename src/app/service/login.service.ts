import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
interface LoginResponse {
  token: string,
  role:string
}

interface statusResponse {
  message: string,
  role:string
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  host = environment.apiUrl;
  isAuth = new BehaviorSubject<boolean>(null);

  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    const mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    let credentials = {};
    if (username.match(mailformat)) {
      credentials = { "email": username, "password": password };
    }
    else {
      credentials = { "username": username, "password": password };
    }
    return this.http.post<LoginResponse>(`${this.host}/login`, credentials).pipe(
      tap(({ token }) => {
        if (token) {
          this.isAuth.next(true);
        }
        else {
          this.isAuth.next(false);
        }
      })
    );
  }

  getStatus() {
    return this.http.get<statusResponse>(`${this.host}/status`).pipe(
      tap(({message})=>{
        if(message==='verified'){
          this.isAuth.next(true);
        }
        else{
          this.isAuth.next(false);
        }
      })
    )
  }


}
