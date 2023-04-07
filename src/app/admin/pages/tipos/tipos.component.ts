import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TypeModelo } from 'src/app/home/models/home.modelo';
import { HomeService } from 'src/app/home/services/home.service';
import { showModalConfirmation, showNotifyError, showNotifySuccess } from 'src/app/shared/functions/Utilities';
import { ModalTiposComponent } from '../../components/modal-tipos/modal-tipos.component';

@Component({
  selector: 'app-tipos',
  templateUrl: './tipos.component.html',
  styleUrls: ['./tipos.component.scss']
})
export class TiposComponent implements OnInit {

  displayedColumns: string[] = [
    'position',
    'name',
    'description',
    'options',
  ];
  objTypes!: TypeModelo[];

  constructor(private _hs: HomeService, private matDialog: MatDialog) {}

  ngOnInit(): void {
    this.consultaInfo();
  }

  consultaInfo(): void {
    this._hs.getTypes().subscribe(
      (res: TypeModelo[]) => {
        this.objTypes = res;
      },
      (e) => {
        showNotifyError('Error consultar información');
      }
    );
  }

  openModal(isNew: boolean, categoria?: TypeModelo) {
    this.matDialog
      .open(ModalTiposComponent, {
        panelClass: 'sinpadding',
        width: '800px',
        height: 'auto',
        data: {
          isNew,
          objType: categoria,
        },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res)
          this.consultaInfo();
      });
  }

  deleteType(categoria: TypeModelo) {
    showModalConfirmation(
      'Eliminar categoría',
      '¿Seguro que deseas eliminar esta categoría?'
    ).then((res) => {
      if (res.isConfirmed) {
        this._hs.deleteType(categoria._id.$oid).subscribe(
          (res) => {
            showNotifySuccess('Categoría eliminada');
            this.consultaInfo();
          },
          (e) => {
            showNotifyError('Error al eliminar la categoría');
          }
        );
      }
    });
  }

}
