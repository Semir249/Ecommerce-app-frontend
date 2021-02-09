import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product/product.component';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgImageSliderModule } from 'ng-image-slider';
@NgModule({
  declarations: [ProductComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    NgImageSliderModule
  ]
})
export class ProductDetailsModule { }
