import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { MisionVisionComponent } from './mision-vision/mision-vision.component';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    MisionVisionComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
