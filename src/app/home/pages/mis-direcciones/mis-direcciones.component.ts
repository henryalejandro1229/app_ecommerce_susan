import { Component, OnInit } from '@angular/core';
import { DireccionModelo } from '../../models/home.modelo';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { HomeService } from '../../services/home.service';
import {
  showModalConfirmation,
  showNotifyError,
  showNotifySuccess,
} from 'src/app/shared/functions/Utilities';
import { NuevaDireccionComponent } from '../../components/nueva-direccion/nueva-direccion.component';

@Component({
  selector: 'app-mis-direcciones',
  templateUrl: './mis-direcciones.component.html',
  styleUrls: ['./mis-direcciones.component.scss'],
})
export class MisDireccionesComponent implements OnInit {
  direcciones: DireccionModelo[] = [];
  loading = true;
  estados: string[] = [];

  constructor(
    private _hs: HomeService,
    private matDialog: MatDialog,
    private _auth: AuthService
  ) {
    this.getEstados();
    this.getDirecciones();
  }

  ngOnInit(): void {}

  getDirecciones() {
    this._hs.getDirecciones(this._auth.token).subscribe(
      (res: DireccionModelo[]) => {
        this.direcciones = res;
      },
      (e) => {
        showNotifyError('Error consultar las direcciones');
      }
    );
  }

  private getEstados() {
    this.loading = true;
    this._hs.getEdos().subscribe(
      (res: any) => {
        this.loading = false;
        this.estados = res.response.estado;
      },
      (e) => {
        showNotifyError('Error consultar los estados');
      }
    );
  }

  openModalDireccion(isNew: boolean, direccion?: DireccionModelo) {
    this.matDialog
      .open(NuevaDireccionComponent, {
        panelClass: 'sinpadding',
        width: '700px',
        height: 'auto',
        data: {
          isNew,
          direccion,
          estados: this.estados
        },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) this.getDirecciones();
      });
  }

  eliminarDireccion(direccion: DireccionModelo) {
    showModalConfirmation(
      'Eliminar dirección',
      '¿Seguro que deseas eliminar esta dirección?'
    ).then((res) => {
      if (res.isConfirmed) {
        this._hs.deleteDireccion(direccion._id.$oid).subscribe(
          (res: any) => {
            showNotifySuccess('Dirección eliminada correctamente');
            this.getDirecciones();
          },
          (e) => {
            showNotifyError('Error al actualizar');
          }
        );
      }
    });
  }
}
