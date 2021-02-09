import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { GetProfileResponse } from '../interfaces/my-profile-response';
import { ProfileService } from '../service/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile:GetProfileResponse;
  profileForm:FormGroup;
  constructor(private activatedroute:ActivatedRoute,private profileservice:ProfileService) {
    this.activatedroute.data.subscribe(
      (res:{profile:GetProfileResponse})=>{
        this.profile=res.profile;
      }
    );
   }

  ngOnInit(): void {
    console.log(this.profile.profile.birthday);
    this.profileForm=new FormGroup({
      email:new FormControl(this.profile.profile.email,[Validators.required,Validators.email]),
      username:new FormControl(this.profile.profile.username,[Validators.required,Validators.maxLength(10),Validators.minLength(5)]),
      birthday:new FormControl(this.profile.profile.birthday.split("-").reverse().join("-"),Validators.required),
      location:new FormControl(this.profile.profile.location,Validators.required),
      zipcode:new FormControl(this.profile.profile.zipcode,[Validators.required,Validators.min(100),Validators.pattern('^[0-9]+$')])
    })
  }

  

  editProfile(){
    if(this.profileForm.invalid){
      return;
    }
    this.profileForm.value.birthday=this.profileForm.value.birthday.split("-").reverse().join("-");
    this.profileservice.editProfile(this.profileForm.value).subscribe({
      next:(res:{token:string,message:string})=>{
        localStorage.setItem('token',res.token);
        console.log(res.message);
      },
      error:(err)=>{
        console.log(err.error.message);
      }
    })
  }
}
