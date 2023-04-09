import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TypeModelo, ProductoModelo } from 'src/app/home/models/home.modelo';
import { AuthService } from '../services/auth.service';
import {
  showModalConfirmation,
  showNotifyError,
  showNotifySuccess,
  showNotifyWarning,
} from '../functions/Utilities';
import { HomeService } from 'src/app/home/services/home.service';
import { MatDialog } from '@angular/material/dialog';
import { ResultadosBusquedaComponent } from '../../home/pages/resultados-busqueda/resultados-busqueda.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  objTipos!: TypeModelo[];

  constructor(
    private router: Router,
    public _auth: AuthService,
    private _hs: HomeService,
    private matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getTypes();
  }

  public routerLink(path: string): void {
    this.router.navigate([path]);
  }

  logout() {
    showModalConfirmation(
      'Cerrar sesión',
      '¿Seguro que deseas cerrar sesión?'
    ).then((res) => {
      if (res.isConfirmed) {
        this._auth.logout();
        showNotifySuccess('Se cerró sesión correctamente');
        this.router.navigate(['/home']);
      }
    });
  }

  getTypes() {
    this._hs.getTypes().subscribe(
      (res) => {
        this.objTipos = res;
      },
      (e) => {
        showNotifyError('Error al consultar');
      }
    );
  }

  verTipo(type: TypeModelo) {
    this.router.navigate(['/home/list-product'], {
      queryParams: { ID: type._id.$oid },
    });
  }

  search(txtSearch: string) {
    if (!txtSearch || txtSearch.length === 0) {
      showNotifyWarning('Ingrese un texto de busqueda');
      return;
    }
    this.router.navigate(['/home/resultados-busqueda'], {
      queryParams: { search: txtSearch },
    });
  }
}
