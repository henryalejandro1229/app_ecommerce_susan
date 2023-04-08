import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductoModelo, TypeModelo } from 'src/app/home/models/home.modelo';
import { HomeService } from 'src/app/home/services/home.service';
import { environment } from 'src/environments/environment';
import { showNotifyError } from '../../../shared/functions/Utilities';

@Component({
  selector: 'app-resultados-busqueda',
  templateUrl: './resultados-busqueda.component.html',
  styleUrls: ['./resultados-busqueda.component.scss'],
})
export class ResultadosBusquedaComponent implements OnInit {
  urlImage = environment.urlImg;
  imageName = '';
  id!: string;
  txtSearch!: string;
  objProductos!: ProductoModelo[];
  objTypes!: TypeModelo[];

  displayedColumns: string[] = [
    'position',
    'name',
    'description',
    'categoria',
    'marca',
    'precio',
  ];

  constructor(
    private matRef: MatDialogRef<ResultadosBusquedaComponent>,
    private _hs: HomeService,
    @Inject(MAT_DIALOG_DATA)
    @Optional()
    public data: {
      txtSearch: string;
    }
  ) {}

  ngOnInit(): void {
    if (this.data.txtSearch) {
      this.txtSearch = this.data.txtSearch;
      this.buscar();
    }
    this._hs.getTypes().subscribe(
      (res: TypeModelo[]) => {
        this.objTypes = res;
      },
      (e) => {
        showNotifyError('Error consultar información');
      }
    );
  }

  buscar(): void {
    this._hs.findProduct(this.txtSearch).subscribe(
      (res: ProductoModelo[]) => {
        this.objProductos = res;
      },
      (e) => {
        showNotifyError('Error al buscar');
      }
    );
  }

  getType(id: string): string {
    if (this.objTypes && this.objTypes.length > 0) {
      let type = this.objTypes.find((type) => type._id.$oid === id);
      return type ? type.name : '';
    }
    return '';
  }
}
