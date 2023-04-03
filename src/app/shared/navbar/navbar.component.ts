import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TypeModelo, ProductoModelo } from 'src/app/home/models/home.modelo';
import { AuthService } from '../services/auth.service';
import { showModalConfirmation, showNotifyError, showNotifySuccess } from '../functions/Utilities';
import { HomeService } from 'src/app/home/services/home.service';


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
    private _hs: HomeService
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

  verMarca(brand: TypeModelo) {
    this.router.navigate(['/home/list-product', brand._id.$oid]);
  }
}
