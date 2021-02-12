import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PopularResolverService } from './landing/popular/popular-resolver.service';
import { ProductsResolverService } from './landing/products/products-resolver.service';
import { ProductComponent } from './product-details/product/product.component';
import { ProductDetailsResolverService } from './product-details/product/product-details-resolver.service';
import { CartComponent } from './cart/cart.component';
import { CartResolverService } from './cart/cart-resolver.service';
import { AuthGuard } from './guard/auth.guard';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileResolverService } from './profile/profile-resolver.service';
import { NewPasswordComponent } from './new-password/new-password.component';
import { OrderComponent } from './order/order.component';
import { OrderResolverService } from './order/order-resolver.service';
import { AddProductComponent } from './add-product/add-product.component';
import { ManageProductsModule } from './manage-products/manage-products.module';
import { ReviewsComponent } from './reviews/reviews.component';
import { ReviewResolverService } from './reviews/review-resolver.service';
import { ResetComponent } from './reset/reset.component';
import { SearchComponent } from './search/search.component';
import { SearchResolverService } from './search/search-resolver.service';
import { WishlistComponent } from './wishlist/wishlist.component';
const routes: Routes = [{
  path:'',
  loadChildren:()=>import('./landing/landing.module').then(mod=>mod.LandingModule),
  resolve:{images:PopularResolverService,products:ProductsResolverService}
},
{
   path: 'product/:id',
  component:ProductComponent,
  resolve:{product:ProductDetailsResolverService},
  runGuardsAndResolvers:'pathParamsChange'
},
{
  path:'cart',
  canActivate:[AuthGuard],
  component:CartComponent,
  resolve:{cart:CartResolverService}
},
{
  path:'profile',
  canActivate:[AuthGuard],
  component:ProfileComponent,
  resolve:{profile:ProfileResolverService}
},
{
path:'change-password',
canActivate:[AuthGuard],
component:NewPasswordComponent
},
{
  path:'orders',
  canActivate:[AuthGuard],
  component:OrderComponent,
  resolve:{myOrders:OrderResolverService}
},
{
  path:'add-product',
  component:AddProductComponent
},
{
  path:'review',
  component:ReviewsComponent,
  resolve:{myReviews:ReviewResolverService}
},
{
  path:'reset/:id',
  component:ResetComponent
},
{
  path:'manage-products',
  canActivate:[AuthGuard],
  loadChildren:()=>import('./manage-products/manage-products.module').then(mod=>mod.ManageProductsModule)
},
{
  path:'search',
  component:SearchComponent,
  resolve:{products:SearchResolverService},
  runGuardsAndResolvers:'paramsOrQueryParamsChange'
},{
  path:'wishlist',
  component:WishlistComponent
}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
