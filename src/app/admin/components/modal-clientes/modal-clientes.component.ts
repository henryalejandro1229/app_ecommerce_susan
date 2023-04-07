import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ClienteModelo } from 'src/app/home/models/home.modelo';
import { HomeService } from 'src/app/home/services/home.service';
import { showNotifyError, showNotifySuccess } from 'src/app/shared/functions/Utilities';

@Component({
  selector: 'app-modal-clientes',
  templateUrl: './modal-clientes.component.html',
  styleUrls: ['./modal-clientes.component.scss']
})
export class ModalClientesComponent implements OnInit {

  form!: FormGroup;
  id!: string;

  constructor(
    private matRef: MatDialogRef<ModalClientesComponent>,
    private _hs: HomeService,
    @Inject(MAT_DIALOG_DATA)
    @Optional()
    public data: {
      objCliente: ClienteModelo;
      isNew: boolean;
    }
  ) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      isAdmin: new FormControl('', []),
    });
  }

  ngOnInit(): void {
    if (this.data.objCliente) {
      this.id = this.data.objCliente._id.$oid;
      this.form.controls['name'].setValue(this.data.objCliente.name);
      this.form.controls['email'].setValue(
        this.data.objCliente.email
      );
      this.form.controls['password'].setValue(
        this.data.objCliente.password
      );
      this.form.controls['isAdmin'].setValue(
        this.data.objCliente.isAdmin
      );
    }
  }

  submit() {
    this.data.isNew ? this.createClient() : this.updateClient();
    this.matRef.close(true);
  }

  updateClient(): void {
    this._hs.updateClient(this.id, this.form.getRawValue()).subscribe(
      (res: any) => {
        showNotifySuccess(
          'Cliente actualizado'
        );
      },
      (e) => {
        showNotifyError('Error al actualizar');
      }
    );
  }

  createClient(): void {
    this._hs.createClient(this.form.getRawValue()).subscribe(
      (res: any) => {
        showNotifySuccess(
          'Cliente creado'
        );
      },
      (e) => {
        showNotifyError('Error al crear cliente');
      }
    );
  }
}
