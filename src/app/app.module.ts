import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { InputComponent } from './shared/input/input.component';
import { ProductDetailsModule } from './product-details/product-details.module';
import { CartComponent } from './cart/cart.component';
import { ProfileComponent } from './profile/profile.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { OrderComponent } from './order/order.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ReviewsComponent } from './reviews/reviews.component';
import { ResetComponent } from './reset/reset.component';
import { SearchComponent } from './search/search.component';
import {MatMenuModule} from '@angular/material/menu';
import { WishlistComponent } from './wishlist/wishlist.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    // InputComponent,
    CartComponent,
    ProfileComponent,
    NewPasswordComponent,
    OrderComponent,
    AddProductComponent,
    ReviewsComponent,
    ResetComponent,
    SearchComponent,
    WishlistComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    ProductDetailsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
