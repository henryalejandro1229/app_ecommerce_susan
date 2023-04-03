import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BrandModelo, ProductoModelo } from 'src/app/home/models/home.modelo';
import { AuthService } from '../services/auth.service';
import { showModalConfirmation, showNotifyError, showNotifySuccess } from '../functions/Utilities';
import { HomeService } from 'src/app/home/services/home.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  isAuth = false;
  isAdmin = false;
  objMarcas!: BrandModelo[];

  constructor(
    private router: Router,
    public _auth: AuthService,
    private _hs: HomeService
  ) {}

  ngOnInit(): void {
    this.getBrands();
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

  getBrands() {
    this._hs.getBrands().subscribe(
      (res) => {
        this.objMarcas = res;
      },
      (e) => {
        showNotifyError('Error al consultar');
      }
    );
  }

  verMarca(category: BrandModelo) {
    this.router.navigate(['/home/brand', category._id.$oid]);
  }
}
