import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HomeService } from '../../services/home.service';
import { environment } from 'src/environments/environment';
import { ProductoModelo, TypeModelo } from '../../models/home.modelo';
import { combineLatest } from 'rxjs';
import { showNotifyError } from 'src/app/shared/functions/Utilities';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.scss']
})
export class DetalleProductoComponent implements OnInit {

  urlImage = environment.urlImg;
  objTypes!: TypeModelo[];
  objProducto!: ProductoModelo;
  loading = false;
  type!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private _hs: HomeService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((res) => {
      if (res) {
        this.consultaInfo(res['ID']);
      }
    });
  }

  consultaInfo(id: string): void {
    this.loading = true;
    combineLatest(
      this._hs.getProduct(id),
      this._hs.getTypes()
    ).subscribe(
      (res) => {
        this.objProducto = res[0][0];
        this.objTypes = res[1];
        let resp = this.objTypes.find(type => type._id.$oid = this.objProducto.typeID);
        this.type = resp? resp.name : '';
        this.loading = false;
      },
      (e) => {
        this.loading = false;
        showNotifyError('Error consultar información');
      }
    );
  }
}
