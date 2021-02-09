import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthorizationService } from '../service/authorization.service';
import { Match } from '../validators/match';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit {

  constructor(private match:Match,private authorizationservice:AuthorizationService) { }

  ngOnInit(): void {
  }

  changePasswordForm=new FormGroup({
    currentpassword:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required,Validators.maxLength(15),Validators.minLength(6)]),
    confirmpassword:new FormControl('',[Validators.required,Validators.maxLength(15),Validators.minLength(6)]),
  },{validators:[this.match.validate]});


  changePassword(){
    if(this.changePasswordForm.invalid){
      return;
    }
    this.authorizationservice.changePassword(this.changePasswordForm.value.currentpassword,this.changePasswordForm.value.password).subscribe({
      next:(res)=>{
        console.log(res.message);
      },  
      error:(err)=>{
        console.log(err.error.message);
      }
    })
  }

  showErrors(){
    const { dirty,touched,errors }=this.changePasswordForm;
    return dirty && touched && errors;
      
    }
}
