import { Component, OnInit } from '@angular/core';
import { ProductoModelo, TypeModelo } from '../../models/home.modelo';
import { HomeService } from '../../services/home.service';
import { showNotifyError } from 'src/app/shared/functions/Utilities';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {
  objProducts!: ProductoModelo[];
  objTipos!: TypeModelo[];

  constructor(private _hs: HomeService) {}

  ngOnInit(): void {
    this.getProducts();
    this.getTypes();
  }

  getProducts() {
    this._hs.getProducts().subscribe(
      (res) => {
        this.objProducts = res;
        if (this.objProducts.length > 9) this.objProducts.length = 9;
      },
      (e) => {
        showNotifyError('Error al consultar productos');
      }
    );
  }

  getTypes() {
    this._hs.getTypes().subscribe(
      (res) => {
        this.objTipos = res;
        if (this.objTipos.length > 6) this.objTipos.length = 6;
      },
      (e) => {
        showNotifyError('Error al consultar tipos de licores');
      }
    );
  }
}
