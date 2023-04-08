import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BreadcrumbModule } from 'angular-crumbs';
import { CarruselComponent } from './carrusel/carrusel.component';
import { PageNoFoundComponent } from './page-no-found/page-no-found.component';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';



@NgModule({
  declarations: [
    NavbarComponent,
    FooterComponent,
    CarruselComponent,
    PageNoFoundComponent,
    NavbarAdminComponent,
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
    CarruselComponent,
    PageNoFoundComponent,
    NavbarAdminComponent,
  ],
})
export class SharedModule { }
