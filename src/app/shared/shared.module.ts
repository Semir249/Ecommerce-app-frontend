import { Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StarsComponent } from './stars/stars.component';

@NgModule({
  declarations: [HeaderComponent,InputComponent, StarsComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[
    InputComponent,
    HeaderComponent,
    StarsComponent
  ]
})
export class SharedModule { }
