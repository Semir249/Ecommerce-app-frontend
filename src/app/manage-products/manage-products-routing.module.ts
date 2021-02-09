import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsResolverService } from '../landing/products/products-resolver.service';
import { EditProductComponent } from './edit-product/edit-product.component';
import { NewProductComponent } from './new-product/new-product.component';
import { ProductListComponent } from './product-list/product-list.component';
import { EditProductResolverService } from './edit-product/edit-product-resolver.service';
const routes: Routes = [{
  path:'',
  component:ProductListComponent,
  resolve:{products:ProductsResolverService}
},
{
  path:'edit-product',
  component:EditProductComponent,
  resolve:{product:EditProductResolverService}
},
{
  path:'add-product',
  component:NewProductComponent,
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageProductsRoutingModule { }
