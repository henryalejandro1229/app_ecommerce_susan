import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';
import { ClientesComponent } from './pages/clientes/clientes.component';
import { ProductosComponent } from './pages/productos/productos.component';
import { TiposComponent } from './pages/tipos/tipos.component';
import { ModalClientesComponent } from './components/modal-clientes/modal-clientes.component';
import { ModalProductosComponent } from './components/modal-productos/modal-productos.component';
import { ModalTiposComponent } from './components/modal-tipos/modal-tipos.component';



@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent,
    ClientesComponent,
    ProductosComponent,
    TiposComponent,
    ModalClientesComponent,
    ModalProductosComponent,
    ModalTiposComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
