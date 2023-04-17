import {
  Component,
  OnInit,
  Inject,
  Optional,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  ImagenModelo,
  ProductoModelo,
  TypeModelo,
} from 'src/app/home/models/home.modelo';
import { HomeService } from 'src/app/home/services/home.service';
import {
  showNotifyError,
  showNotifySuccess,
  showSwalWarning,
} from 'src/app/shared/functions/Utilities';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-modal-productos',
  templateUrl: './modal-productos.component.html',
  styleUrls: ['./modal-productos.component.scss'],
})
export class ModalProductosComponent implements OnInit {
  urlImage = environment.urlImg;
  imageName = '';
  form!: FormGroup;
  id!: string;
  objTypes!: TypeModelo[];
  objImagen: ImagenModelo = {
    nombreArchivo: '',
    base64textString: '',
  };
  objCategoria = [
    '120 mL',
    '210 mL',
    '500 mL',
    '600 mL',
    '700 mL',
    '750 mL',
    '900 mL',
    '1 L',
    '1.2 L',
    '1.8 L',
    '2 L',
  ];
  extPermitidas = ['jpg', 'jpeg', 'png'];
  @ViewChild('imagenPrevisualizacion') imagenPrevisualizacion!: ElementRef;
  @ViewChild('inputFile') inputFile!: ElementRef;

  constructor(
    private matRef: MatDialogRef<ModalProductosComponent>,
    private _hs: HomeService,
    @Inject(MAT_DIALOG_DATA)
    @Optional()
    public data: {
      objProduct: ProductoModelo;
      isNew: boolean;
    }
  ) {
    this.form = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-z\s\u00E0-\u00FC\u00f1]*$/i),
      ]),
      description: new FormControl('', [Validators.required]),
      marca: new FormControl('', [Validators.required]),
      precio: new FormControl('', [Validators.required, Validators.min(1)]),
      typeID: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.consultaInfo();
    if (this.data.objProduct) {
      this.id = this.data.objProduct._id.$oid;
      this.form.controls['title'].setValue(this.data.objProduct.title);
      this.form.controls['description'].setValue(
        this.data.objProduct.description
      );
      this.form.controls['typeID'].setValue(this.data.objProduct.typeID);
      this.form.controls['marca'].setValue(this.data.objProduct.marca);
      this.form.controls['precio'].setValue(this.data.objProduct.precio);
      this.imageName = this.data.objProduct.imageUrl;
    }
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

  submit() {
    this.data.isNew ? this.createProduct() : this.updateProduct();
    this.matRef.close(true);
  }

  updateProduct(): void {
    this._hs
      .updateProduct(
        this.id,
        this.form.getRawValue(),
        this.objImagen.nombreArchivo.length
          ? this.objImagen.nombreArchivo
          : this.imageName
      )
      .subscribe(
        (res: any) => {
          showNotifySuccess('Producto actualizado');
          if (this.objImagen.nombreArchivo.length > 0) this.uploadImage();
        },
        (e) => {
          showNotifyError('Error al actualizar');
        }
      );
  }

  createProduct(): void {
    this._hs
      .createProduct(this.form.getRawValue(), this.objImagen.nombreArchivo)
      .subscribe(
        (res: any) => {
          showNotifySuccess('Producto creado');
          if (this.objImagen.nombreArchivo.length > 0) this.uploadImage();
        },
        (e) => {
          showNotifyError('Error al crear producto');
        }
      );
  }

  getFileExtension(filename: string) {
    return filename.split('.').pop();
  }

  seleccionarImagen(event: any) {
    const files = event.target.files;
    const file = files[0];
    const ext = this.getFileExtension(file.name);
    if (ext && !this.extPermitidas.includes(ext)) {
      showSwalWarning(
        'Formato de archivo no valido',
        'Solo se admiten imagenes con formato .jpg, .jpeg, .png'
      );
      this.inputFile.nativeElement.value = '';
      return;
    }

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
