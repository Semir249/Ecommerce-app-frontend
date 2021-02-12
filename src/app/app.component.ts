import { Component } from '@angular/core';
import { LoginService } from './service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  sidenav=false;
  title = 'eccomerce-frontend';
  search='';
  show=false;
  loggedIn=false;
  admin=false;
  wishlist=[];
  constructor(/*private productservice:ProductService,*/
    private loginservice:LoginService,
    private router:Router
    ){
    
    }
  
  ngOnInit() {
    this.loginservice.getStatus().subscribe({
      next: (res) => {
        if (res.message === 'verified') {
          this.loginservice.isAuth.next(true);
          this.loggedIn=true;
          if(res.role=='ROLE_ADMIN'){
            this.admin=true;
          }
        }
      },
      error: (err) => {
        {
          this.loginservice.isAuth.next(false);
        }
      }
    });
  }

  searchProduct(){
    
    if(this.search===''){
      console.log('search bar empty');
      return;
    }
    else{
      this.router.navigate(['search'], { queryParams: { product: this.search }});
      
    }
  }

  

  isLoggedIn(){
    this.loggedIn=true;
    this.show=false;
  }

  logout(){
    localStorage.clear();
    window.location.reload();
    this.loggedIn=false;
  }

  isAdmin(){
    this.admin=true;
  }

  open(){
    if(!this.loggedIn){
      this.show=true;
    }
  }

  goTowishList(){
    this.router.navigate(['wishlist']);
  }

  
  modalOpen(){
    this.show=!this.show;
  }
   
}
