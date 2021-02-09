import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorizationService } from '../service/authorization.service';
import { Match } from '../validators/match';
@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  constructor(private match:Match,private route:ActivatedRoute,private authorizationservice:AuthorizationService,private router:Router) {
    
   }

  ngOnInit(): void {
  }

  changePasswordForm=new FormGroup({
    password:new FormControl('',[Validators.required,Validators.maxLength(15),Validators.minLength(6)]),
    confirmpassword:new FormControl('',[Validators.required,Validators.maxLength(15),Validators.minLength(6)]),
  },{validators:[this.match.validate]});

  changePassword(){
    this.authorizationservice.newPassword({password:this.changePasswordForm.value.password,
    passwordToken:this.route.snapshot.paramMap.get('id')}).subscribe({
      next:(res)=>{
        this.router.navigateByUrl('/');
      },
      error:(err)=>{
        console.log(err.error.message);
      }
    });
  }

  showErrors(){
    const { dirty,touched,errors }=this.changePasswordForm;
    return dirty && touched && errors;
      
    }
}
