import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { ProfileService } from '../service/profile.service';
@Injectable({
  providedIn: 'root'
})
export class ProfileResolverService implements Resolve<any> {

  constructor(private profileservice:ProfileService) { }

  resolve(route:ActivatedRouteSnapshot){
    return this.profileservice.getProfile();
  }

}
