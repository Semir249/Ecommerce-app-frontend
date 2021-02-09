import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LandingRoutingModule } from './landing-routing.module';
import { ContentComponent } from './content/content.component';
import { PopularComponent } from './popular/popular.component';
import { ProductsComponent } from './products/products.component';
import { SharedModule } from '../shared/shared.module';
import { NgImageSliderModule } from 'ng-image-slider';
@NgModule({
  declarations: [ContentComponent, PopularComponent, ProductsComponent],
  imports: [
    CommonModule,
    LandingRoutingModule,
    SharedModule,
    NgImageSliderModule
  ]
})
export class LandingModule { }
