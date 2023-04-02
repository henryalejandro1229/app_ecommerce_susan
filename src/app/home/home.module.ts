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



@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    InicioComponent,
    SingUpComponent,
    ForgotPwdComponent,
    RegisterProcessComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
