import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { LoginComponent } from './pages/login/login.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { SharedModule } from '../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { SingUpComponent } from './pages/sing-up/sing-up.component';
import { ForgotPwdComponent } from './pages/forgot-pwd/forgot-pwd.component';
import { RegisterProcessComponent } from './pages/register-process/register-process.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { BrandsComponent } from './pages/brands/brands.component';
import { ListProductsComponent } from './pages/list-products/list-products.component';
import { MisComprasComponent } from './pages/mis-compras/mis-compras.component';
import { AvisoPrivacidadComponent } from './pages/aviso-privacidad/aviso-privacidad.component';
import { PreguntasFrecuentesComponent } from './pages/preguntas-frecuentes/preguntas-frecuentes.component';
import { ResultadosBusquedaComponent } from './pages/resultados-busqueda/resultados-busqueda.component';



@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    InicioComponent,
    SingUpComponent,
    ForgotPwdComponent,
    RegisterProcessComponent,
    ResetPasswordComponent,
    BrandsComponent,
    ListProductsComponent,
    MisComprasComponent,
    AvisoPrivacidadComponent,
    PreguntasFrecuentesComponent,
    ResultadosBusquedaComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
