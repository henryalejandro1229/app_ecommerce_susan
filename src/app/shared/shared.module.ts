import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BreadcrumbModule } from 'angular-crumbs';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BreadcrumbModule,
  ],
  exports: [
    MaterialModule,
    FormsModule,
    NavbarComponent,
    FooterComponent,
    ReactiveFormsModule,
    HttpClientModule,
    BreadcrumbModule,
  ],
})
export class SharedModule { }
