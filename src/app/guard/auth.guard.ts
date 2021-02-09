import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service'; 
import { take,tap,skipWhile } from 'rxjs/operators'; 
import { AppComponent } from '../app.component';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private loginservice:LoginService,private router:Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
      return this.loginservice.isAuth.pipe(skipWhile(value => value === null),
      take(1),
      tap((value) => {
        if (!value) {
          console.log('not loggedIn');
          this.router.navigate(['/'],{state:{data:'OpenModal'}})
        }
      }));
  }
  
}
