import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ClienteModelo } from 'src/app/home/models/home.modelo';
import { HomeService } from 'src/app/home/services/home.service';
import { showModalConfirmation, showNotifyError, showNotifySuccess } from 'src/app/shared/functions/Utilities';
import { ModalClientesComponent } from '../../components/modal-clientes/modal-clientes.component';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  displayedColumns: string[] = [
    'position',
    'name',
    'email',
    'password',
    'isAdmin',
    'options',
  ];
  objUsers!: ClienteModelo[];

  constructor(private _hs: HomeService, private matDialog: MatDialog) {}

  ngOnInit(): void {
    this.consultaInfo();
  }

  consultaInfo(): void {
    this._hs.getUsuarios().subscribe(
      (res: ClienteModelo[]) => {
        this.objUsers = res;
      },
      (e) => {
        showNotifyError('Error consultar información');
      }
    );
  }

  openModal(isNew: boolean, cliente?: ClienteModelo) {
    this.matDialog
      .open(ModalClientesComponent, {
        panelClass: 'sinpadding',
        width: '500px',
        height: 'auto',
        data: {
          isNew,
          objCliente: cliente,
        },
      })
      .afterClosed()
      .subscribe((res) => {
        if (res) this.consultaInfo();
      });
  }

  deleteClient(cliente: ClienteModelo) {
    showModalConfirmation(
      'Eliminar cliente',
      '¿Está seguro de eliminar este cliente?'
    ).then((res) => {
      if (res.isConfirmed) {
        this._hs.deleteClient(cliente._id.$oid).subscribe(
          (res) => {
            showNotifySuccess('Cliente eliminado');
            this.consultaInfo();
          },
          (e) => {
            showNotifyError('Error al eliminar cliente');
          }
        );
      }
    });
  }

}