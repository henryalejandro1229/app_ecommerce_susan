import { Component, OnInit, Inject, Optional } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {
  ProductoModelo,
  TypeModelo,
} from 'src/app/home/models/home.modelo';
import { HomeService } from 'src/app/home/services/home.service';
import { environment } from 'src/environments/environment';
import {
  showNotifyError,
  showNotifyWarning,
} from '../../../shared/functions/Utilities';
import { ActivatedRoute, Router } from '@angular/router';

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
  min!: number;
  max!: number;
  typeSelectID!: string;
  priceError = false;

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
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getTypes();
    this.activatedRoute.queryParams.subscribe((res) => {
      if (res) {
        this.setFiltros(res);
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

  setFiltros(res: any) {
    console.log(res);
    this.txtSearch = res['search'];
    this.min = res['min'];
    this.max = res['max'];
    this.typeSelectID = res['typeID'];
    this.buscar();
  }

  validaFiltroPrecio() {
    if (this.min && this.max) {
      this.priceError = this.min > this.max;
      return;
    }
    this.priceError = false;
  }

  buscar(): void {
    this.loading = true;
    this._hs.findProduct(this.txtSearch, this.min, this.max, this.typeSelectID).subscribe(
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

  aplicarFiltroPrecio() {
    this.router.navigate([], {
      queryParams: {
        search: this.txtSearch,
        min: this.min,
        max: this.max,
        typeID: this.typeSelectID,
      },
    });
  }

  filterType() {
    this.router.navigate([], {
      queryParams: {
        search: this.txtSearch,
        min: this.min,
        max: this.max,
        typeID: this.typeSelectID,
      },
    });
  }

  verProducto(producto: ProductoModelo) {
    this.router.navigate(['home/detalle-producto'], {queryParams: {ID : producto._id.$oid}});
  }
}
