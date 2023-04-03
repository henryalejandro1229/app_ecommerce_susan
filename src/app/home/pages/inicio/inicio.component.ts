import { Component, OnInit } from '@angular/core';
import { ProductoModelo } from '../../models/home.modelo';
import { HomeService } from '../../services/home.service';
import { showNotifyError } from 'src/app/shared/functions/Utilities';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {
  objProducts!: ProductoModelo[];

  constructor(private _hs: HomeService) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this._hs.getProducts().subscribe(
      (res) => {
        this.objProducts = res;
        if(this.objProducts.length > 6)
          this.objProducts.length = 6;
      },
      (e) => {
        showNotifyError('Error al consultar productos');
      }
    );
  }
}
