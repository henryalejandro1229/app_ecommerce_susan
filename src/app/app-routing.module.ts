import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNoFoundComponent } from './shared/page-no-found/page-no-found.component';
import { VerificarEmailComponent } from './shared/verificar-email/verificar-email.component';

const routes: Routes = [
  {
    path: 'home',
    data: { breadcrumb: 'Inicio'},
    loadChildren: () =>
      import('./home/home.module').then((mod) => mod.HomeModule),
  },
  {
    path: 'admin',
    data: { breadcrumb: 'Dashboard'},
    loadChildren: () =>
      import('./admin/admin.module').then((mod) => mod.AdminModule),
  },
  {
    path: 'verificar-correo',
    data: { breadcrumb: 'Verificar correo'},
    component: VerificarEmailComponent
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNoFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
