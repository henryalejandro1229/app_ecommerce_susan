import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { MisionVisionComponent } from './mision-vision/mision-vision.component';



@NgModule({
  declarations: [
    HomeComponent,
    MisionVisionComponent
  ],
  imports: [
    CommonModule
  ]
})
export class HomeModule { }
