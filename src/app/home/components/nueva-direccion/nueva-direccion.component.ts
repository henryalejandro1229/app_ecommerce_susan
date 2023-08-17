import { Component, OnInit, Inject, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DireccionModelo } from '../../models/home.modelo';
import { HomeService } from '../../services/home.service';
import { showNotifyError, showNotifySuccess } from 'src/app/shared/functions/Utilities';

@Component({
  selector: 'app-nueva-direccion',
  templateUrl: './nueva-direccion.component.html',
  styleUrls: ['./nueva-direccion.component.scss']
})
export class NuevaDireccionComponent implements OnInit {

  form!: FormGroup;
  id!: string;

  constructor(
    private matRef: MatDialogRef<NuevaDireccionComponent>,
    private _hs: HomeService,      
    private _auth: AuthService,
    @Inject(MAT_DIALOG_DATA)
    @Optional()
    public data: {
      isNew: boolean;
      direccion: DireccionModelo;
    },
  ) {
    this.form = new FormGroup({
      clienteID: new FormControl(this._auth.token, []),
      nombre: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-z\s\u00E0-\u00FC\u00f1]*$/i),
      ]),
      estado: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-z\s\u00E0-\u00FC\u00f1]*$/i),
      ]),
      municipio: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-z\s\u00E0-\u00FC\u00f1]*$/i),
      ]),
      colonia: new FormControl('', [
        Validators.required,
      ]),
      calle: new FormControl('', [
        Validators.required,
      ]),
      telefono: new FormControl('', [Validators.required]),
      indicaciones: new FormControl('', []),
    });
  }

  ngOnInit(): void {
    if (this.data.direccion) {
      this.id = this.data.direccion._id.$oid;
      this.form.controls['nombre'].setValue(this.data.direccion.nombre);
      this.form.controls['estado'].setValue(this.data.direccion.estado);
      this.form.controls['municipio'].setValue(this.data.direccion.municipio);
      this.form.controls['colonia'].setValue(this.data.direccion.colonia);
      this.form.controls['calle'].setValue(this.data.direccion.calle);
      this.form.controls['telefono'].setValue(this.data.direccion.telefono);
      this.form.controls['indicaciones'].setValue(this.data.direccion.indicaciones);
    }
  }

  submit() {
    this.data.isNew ? this.createClient() : this.updateClient();
    this.matRef.close(true);
  }

  updateClient(): void {
    this._hs.updateDireccion(this.id, this.form.getRawValue()).subscribe(
      (res: any) => {
        showNotifySuccess(
          'Dirección actualizada correctamente'
        );
      },
      (e) => {
        showNotifyError('Error al actualizar');
      }
    );
  }

  createClient(): void {
    this._hs.createdireccion(this.form.getRawValue()).subscribe(
      (res: any) => {
        showNotifySuccess(
          'Dirección agregada correctamente'
        );
      },
      (e) => {
        showNotifyError('Error al agregar dirección');
      }
    );
  }

}
