import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LoginComponent } from './pages/login/login.component';
import { SingUpComponent } from './pages/sing-up/sing-up.component';
import { ForgotPwdComponent } from './pages/forgot-pwd/forgot-pwd.component';
import { RegisterProcessComponent } from './pages/register-process/register-process.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ListProductsComponent } from './pages/list-products/list-products.component';
import { MisComprasComponent } from './pages/mis-compras/mis-compras.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: InicioComponent,
      },
      {
        path: 'login',
        data: { breadcrumb: 'Iniciar sesión' },
        component: LoginComponent,
      },
      {
        path: 'singup',
        data: { breadcrumb: 'Registrate' },
        component: SingUpComponent,
      },
      {
        path: 'forgot-pwd',
        data: { breadcrumb: 'Recuperar contraseña' },
        component: ForgotPwdComponent,
      },
      {
        path: 'singup-process',
        data: { breadcrumb: 'Completa tu información' },
        component: RegisterProcessComponent,
      },
      {
        path: 'reset-password',
        data: { breadcrumb: 'Actualizar contraseña' },
        component: ResetPasswordComponent,
      },
      {
        path: 'list-product/:id',
        data: { breadcrumb: 'Productos de categoría' },
        component: ListProductsComponent,
      },
      {
        path: 'mis-compras',
        data: { breadcrumb: 'Mis compras' },
        component: MisComprasComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
