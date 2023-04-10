import { Component, OnInit } from '@angular/core';
import { ProductoModelo, TypeModelo } from '../../models/home.modelo';
import { HomeService } from '../../services/home.service';
import { showNotifyError } from 'src/app/shared/functions/Utilities';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {
  urlImage = environment.urlImg;
  objProducts!: ProductoModelo[];
  objTipos!: TypeModelo[];
  loading = false;

  constructor(private _hs: HomeService, private router: Router) {}

  ngOnInit(): void {
    this.getProducts();
    this.getTypes();
  }

  getProducts() {
    this.loading = true;
    this._hs.getProducts().subscribe(
      (res) => {
        this.objProducts = res;
        if (this.objProducts.length > 12) this.objProducts.length = 12;
        this.loading = false;
      },
      (e) => {
        showNotifyError('Error al consultar productos');
        this.loading = false;
      }
    );
  }

  getTypes() {
    this.loading = true;
    this._hs.getTypes().subscribe(
      (res) => {
        this.objTipos = res;
        if (this.objTipos.length > 6) this.objTipos.length = 6;
        this.loading = false;
      },
      (e) => {
        showNotifyError('Error al consultar tipos de licores');
        this.loading = false;
      }
    );
  }

  getType(id: string): string {
    if (this.objTipos && this.objTipos.length > 0) {
      let type = this.objTipos.find((type) => type._id.$oid === id);
      return type ? type.name : '';
    }
    return '';
  }

  verTipo(type: TypeModelo) {
    this.router.navigate(['/home/list-product'], {queryParams: {'ID': type._id.$oid}});
  }
}
