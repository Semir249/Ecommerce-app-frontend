import { Component, OnInit,ElementRef, Input,Output,EventEmitter } from '@angular/core';
import { LoginService } from '../service/login.service';
import { CartService } from '../service/cart.service';
import { ProfileService } from '../service/profile.service';
import { OrderService } from '../service/order.service';
import { ProductService } from '../service/product.service';
import { SignupService } from '../service/signup.service';
import { AuthorizationService } from '../service/authorization.service';
import { Match } from '../validators/match';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import {trigger,state,style,animate,transition} from '@angular/animations';
@Component({
  selector: 'app-login',
  animations: [
    trigger('openClose', [
      // ...
      state('open', style({
        height: '50%'
      })),
      state('closed', style({
        height: '100%'
      })),
      transition('open => closed', [
        animate('0.5s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() close=new EventEmitter();
  constructor(
    private loginservice:LoginService,
    private cartservice:CartService,
    private profileservice:ProfileService,
    private orderservice:OrderService,
    private productservice:ProductService,
    private signupservice:SignupService,
    private authorizationservice:AuthorizationService,
    private el:ElementRef,
    private match:Match
    ) { }
  ngOnInit(): void {
    document.body.appendChild(this.el.nativeElement);

    // this.productservice.deleteMyReview('5fe112f0897b742c70949c4d','5fe8d1a015da55276c741961').subscribe(res=>{
    //   console.log(res);
    // })

    // this.productservice.deleteProduct("5fe109a6db25894804ec4a75").subscribe(res=>{
    //   console.log(res);
    // })

    // this.cartservice.deleteCart().subscribe(res=>{
    //   console.log(res);
    // })
    
    // this.productservice.editProductReview({reviewId:"5fe8d1a015da55276c741961",
    // id:"5fe112f0897b742c70949c4d",stars:2}).subscribe(res=>{
    //   console.log(res);
    // })
   

    // this.profileservice.editProfile({email:'john@gmail.com',username:'john',
    // birthday:'24-09-1990',
    // location:'house #01, betel, kolfe keranio, Addis Ababa, Ethiopia'
    // }).subscribe(res=>{
    //   localStorage.setItem('token',res.token);
    // })

    // this.productservice.productReview({id:"5fe112f0897b742c70949c4d",comment:"nice product",stars:5}).subscribe(res=>{
    //   console.log(res);
    // })
    
    
    
   
  //   this.signupservice.signup({
  //     email:"john@gmail.com",
  //     password:"123456",
  //     username:"john",
  //     birthday:"24-09-1996",
  //     location:"house #81, betel, kolfe keranio, Addis Ababa, Ethiopia",
  //     zipcode:"140301"
  // }).subscribe(res=>{
  //   console.log(res);
  // })
    // this.orderservice.getPopular().subscribe(res=>{
    //   console.log(res);
    // })
    // this.orderservice.getAllOrders().subscribe(res=>{
    //   console.log(res);
    // })

    // this.profileservice.getMyReview().subscribe(res=>{
    //   console.log(res);
    // })

    // this.productservice.getProductReview().subscribe(res=>{
    //   console.log(res);
    // });

    // this.productservice.getProducts().subscribe((res)=>{
    //   console.log(res.products[0].images);
    // })
    // this.productservice.getProduct().subscribe({
    //   next:(res)=>{
    //     console.log(res);
    //   },
    //   error:(err)=>{
    //     console.log(err);
    //   }
    // });

    // this.orderservice.getOrder().subscribe({
    //   next:(res)=>{
    //     console.log(res);
    //   },
    //   error:(err)=>{
    //     console.log(err.error.message);
    //   }
    // })


    // this.profileservice.getProfile().subscribe({
    //   next:(res)=>{
    //     console.log(res);
    //   },
    //   error:(err)=>{
    //     console.log(err.error.message);
    //   }
    // })

    
    
  }
  loginForm=new FormGroup({
    usernameemail:new FormControl('',[
      Validators.required
    ]),
    password:new FormControl('',[
      Validators.required
    ])
  });

  signupForm=new FormGroup({
    email:new FormControl('',[Validators.required,Validators.email]),
    username:new FormControl('',[Validators.required,Validators.maxLength(10),Validators.minLength(5)]),
    password:new FormControl('',[Validators.required,Validators.maxLength(15),Validators.minLength(6)]),
    confirmpassword:new FormControl('',[Validators.required,Validators.maxLength(15),Validators.minLength(6)]),
    birthday:new FormControl('',Validators.required),
    location:new FormControl('',Validators.required),
    zipcode:new FormControl('',[Validators.required,Validators.min(100),Validators.pattern('^[0-9]+$')])
  },{validators:[this.match.validate]})

 
  isOpen = true;
  buttonName='Login';
  linkName='Create an account';
  isLoading=false;
  formHeader='Login form';
  errorLogin='';
  errorSignup='';
  signupSuccess=false;
  reset=false;
  resetSuccess=false;
  @Output() loggedIn=new EventEmitter();
  @Output() isAdmin=new EventEmitter();
  loginSubmit(){
    this.isLoading=true;
    if(this.loginForm.invalid){
      return;
    }
      this.loginservice.login(this.loginForm.value.usernameemail,this.loginForm.value.password).subscribe({
        next:(res)=>{
          this.loggedIn.emit();
          localStorage.setItem('token',res.token);
          if(res.role="ROLE_ADMIN"){
            this.isAdmin.emit();
          }
        },
        error:(err)=>{
          this.errorLogin=err.error.message;
          this.loginForm.setErrors({invalidCredentials :true});
        }
      })
    
  }

  signupSubmit(){
    if(this.signupForm.invalid){
      return;
    }
    this.signupservice.signup(
      {"email":this.signupForm.value.email,
      "password":this.signupForm.value.password,
      "username":this.signupForm.value.username,
      "birthday":this.signupForm.value.birthday,
      "location":this.signupForm.value.location,
      "zipcode":this.signupForm.value.zipcode
      }
      ).subscribe({
        next:(res)=>{
          this.signupSuccess=true;
        },
        error:(err)=>{
          console.log(err);
          this.errorSignup=err.error.message;
          this.signupForm.setErrors({invalidCredentials :true});
        }
      })
  }

  resetPassword(){
    if(this.loginForm.value.usernameemail){
    if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(this.loginForm.value.usernameemail))
  {
     this.authorizationservice.resetPassword(this.loginForm.value.usernameemail).subscribe({
       next:(res)=>{
        this.resetSuccess=true;
       },
       error:(err)=>{
         console.log(err.error.message);
       }
     })
  }
  else{
    this.loginForm.setErrors({invalidEmail:true});
  }
}
else{
  return;
}
  }

  toggle(event:Event) {
    event.preventDefault();
    this.isOpen = !this.isOpen;
    this.buttonName=this.isOpen?'Login':'Sign up';
    this.linkName=this.isOpen?'Create an account':'Already have an account?';
    this.formHeader=this.isOpen?'Login form':'Signup form';
    this.reset=false;
  }

  ngOnDestroy(){
    this.el.nativeElement.remove();
    
  }

  onClose(){
    this.close.emit();
  }

  showErrors(){
    const {errors,dirty,touched}=this.loginForm;
    return errors&&dirty&&touched;
  }

  showSignupErrors(){
    const {errors,dirty,touched}=this.signupForm;
    return errors&&dirty&&touched;
  }

}
