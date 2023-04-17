import { Component, OnInit, Inject, Optional, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ImagenModelo, TypeModelo } from 'src/app/home/models/home.modelo';
import { HomeService } from 'src/app/home/services/home.service';
import { showNotifyError, showNotifySuccess, showSwalWarning } from 'src/app/shared/functions/Utilities';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modal-tipos',
  templateUrl: './modal-tipos.component.html',
  styleUrls: ['./modal-tipos.component.scss']
})
export class ModalTiposComponent implements OnInit {

  urlImage = environment.urlImg;
  imageName = '';
  form!: FormGroup;
  id!: string;
  extPermitidas = ['jpg', 'jpeg', 'png'];
  @ViewChild('imagenPrevisualizacion') imagenPrevisualizacion!: ElementRef;
  @ViewChild('inputFile') inputFile!: ElementRef;

  constructor(
    private matRef: MatDialogRef<ModalTiposComponent>,
    private _hs: HomeService,
    @Inject(MAT_DIALOG_DATA)
    @Optional()
    public data: {
      objType: TypeModelo;
      isNew: boolean;
    }
  ) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.pattern(/^[a-z\s\u00E0-\u00FC\u00f1]*$/i)]),
      description: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    if (this.data.objType) {
      this.id = this.data.objType._id.$oid;
      this.form.controls['name'].setValue(this.data.objType.name);
      this.form.controls['description'].setValue(
        this.data.objType.description
      );
      this.imageName = this.data.objType.imageUrl;
    }
  }

  submit() {
    this.data.isNew ? this.createCategory() : this.updateCategory();
    this.matRef.close(true);
  }

  updateCategory(): void {
    this._hs
      .updateType(
        this.id,
        this.form.getRawValue()
      )
      .subscribe(
        (res: any) => {
          showNotifySuccess(
            'Tipo de licor actualizado'
          );
        },
        (e) => {
          showNotifyError('Error al actualizar');
        }
      );
  }

  createCategory(): void {
    this._hs
      .createType(this.form.getRawValue())
      .subscribe(
        (res: any) => {
          showNotifySuccess(
            'Tipo de licor creado',
          );
        },
        (e) => {
          showNotifyError('Error al crear tipo de licor');
        }
      );
  }
}
