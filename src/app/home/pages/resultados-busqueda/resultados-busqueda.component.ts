import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductoModelo, TypeModelo } from 'src/app/home/models/home.modelo';
import { HomeService } from 'src/app/home/services/home.service';
import { environment } from 'src/environments/environment';
import { showNotifyError } from '../../../shared/functions/Utilities';
import { ActivatedRoute } from '@angular/router';

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
  loading = false;

  displayedColumns: string[] = [
    'position',
    'name',
    'description',
    'categoria',
    'marca',
    'precio',
  ];

  constructor(
    private _hs: HomeService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getTypes();
    this.activatedRoute.queryParams.subscribe((res) => {
      if (res) {
        this.buscar(res['search']);
        this.txtSearch = res['search'];
      }
    });
  }

  getTypes() {
    this.loading = true;
    this._hs.getTypes().subscribe(
      (res: TypeModelo[]) => {
        this.objTypes = res;
        this.loading = false;
      },
      (e) => {
        showNotifyError('Error consultar información');
        this.loading = false;
      }
    );
  }

  buscar(txtSearch: string): void {
    this.loading = true;
    this._hs.findProduct(txtSearch).subscribe(
      (res: ProductoModelo[]) => {
        this.objProductos = res;
        this.loading = false;
      },
      (e) => {
        showNotifyError('Error al buscar');
        this.loading = false;
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
