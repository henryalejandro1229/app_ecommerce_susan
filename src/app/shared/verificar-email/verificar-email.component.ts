import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClienteModelo } from 'src/app/home/models/home.modelo';
import { HomeService } from 'src/app/home/services/home.service';
import {
  showNotifyError,
  showNotifySuccess,
  showSwalError,
  showSwalSuccess,
  showSwalWarning,
} from '../functions/Utilities';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-verificar-email',
  templateUrl: './verificar-email.component.html',
  styleUrls: ['./verificar-email.component.scss'],
})
export class VerificarEmailComponent implements OnInit {
  loading = false;

  constructor(
    private _hs: HomeService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private _auth: AuthService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((res) => {
      if (res['ID']) {
        this.loading = true;
        this._hs.getUsuario(res['ID']).subscribe(
          (res: ClienteModelo[]) => {
            if (res[0].name) {
              let token: string = res[0]._id.$oid;
              this._auth.setTokenLocalStorage(token);
              this._auth.setIsAdminLS('false');
              showSwalSuccess(
                `Correo verificado correctamente`,
                `Bienvenido ${res[0].name}`
              ).then((res) => {
                setTimeout(() => {
                  this.router.navigate(['/home']);
                }, 1500);
              });
            } else {
              showSwalWarning(
                `Token no válido`,
                `No se pudo verificar esta cuenta`
              ).then((res) => {
                setTimeout(() => {
                  this.router.navigate(['/home']);
                }, 1500);
              });
            }
            this.loading = false;
            
          },
          (e) => {
            this.loading = false;
            showSwalError(
              `Error al verificar correo`,
              `Intente mas tarde`
            ).then((res) => {
              setTimeout(() => {
                this.router.navigate(['/home']);
              }, 2000);
            });
          }
        );
      } else {
        showNotifyError('Acceso no válido');
        this.router.navigate(['/home']);
      }
    });
  }
}
