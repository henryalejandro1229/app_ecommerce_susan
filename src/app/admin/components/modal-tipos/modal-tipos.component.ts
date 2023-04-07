import { Component, OnInit, Inject, Optional, ViewChild, ElementRef } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ImagenModelo, TypeModelo } from 'src/app/home/models/home.modelo';
import { HomeService } from 'src/app/home/services/home.service';
import { showNotifyError, showNotifySuccess } from 'src/app/shared/functions/Utilities';
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
  objImagen: ImagenModelo = {
    nombreArchivo: '',
    base64textString: '',
  };
  @ViewChild('imagenPrevisualizacion') imagenPrevisualizacion!: ElementRef;

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
      name: new FormControl('', [Validators.required]),
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
        this.form.getRawValue(),
        this.objImagen.nombreArchivo.length
          ? this.objImagen.nombreArchivo
          : this.imageName
      )
      .subscribe(
        (res: any) => {
          showNotifySuccess(
            'Categoría actualizada'
          );
          if (this.objImagen.nombreArchivo.length > 0) this.uploadImage();
        },
        (e) => {
          showNotifyError('Error al actualizar');
        }
      );
  }

  createCategory(): void {
    this._hs
      .createType(this.form.getRawValue(), this.objImagen.nombreArchivo)
      .subscribe(
        (res: any) => {
          showNotifySuccess(
            'Categoría creada',
          );
          if (this.objImagen.nombreArchivo.length > 0) this.uploadImage();
        },
        (e) => {
          showNotifyError('Error al crear categoría');
        }
      );
  }

  seleccionarImagen(event: any) {
    const files = event.target.files;
    const file = files[0];
    console.log(file);

    this.objImagen.nombreArchivo = file.name;
    const objectURL = URL.createObjectURL(file);
    this.imagenPrevisualizacion.nativeElement.src = objectURL;

    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoaded(readerEvent: any) {
    var binaryString = readerEvent.target.result;
    this.objImagen.base64textString = btoa(binaryString);
  }

  uploadImage() {
    console.log(this.objImagen);
    this._hs.uploadFile(this.objImagen).subscribe(
      (datos) => {},
      (e) => {
        showNotifyError('Error al subir imagen');
      }
    );
  }
}
