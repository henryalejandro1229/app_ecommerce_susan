import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { TiposComponent } from './pages/tipos/tipos.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'productos',
        data: { breadcrumb: 'Productos' },
        component: ProductosComponent,
      },
      {
        path: 'clientes',
        data: { breadcrumb: 'Clientes' },
        component: ClientesComponent,
      },
      {
        path: 'tipos',
        data: { breadcrumb: 'Tipos' },
        component: TiposComponent,
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
