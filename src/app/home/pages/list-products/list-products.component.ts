import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest } from 'rxjs';
import { HomeService } from '../../services/home.service';
import { environment } from 'src/environments/environment';
import { ProductoModelo, TypeModelo } from '../../models/home.modelo';
import { showNotifyError } from 'src/app/shared/functions/Utilities';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit {
  urlImage = environment.urlImg;
  objType!: TypeModelo;
  objProductos!: ProductoModelo[];
  loading = false;

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
      this._hs.getType(id),
      this._hs.getProductsPerType(id)
    ).subscribe(
      (res) => {
        this.objType = res[0][0];
        this.objProductos = res[1];
        this.loading = false;
      },
      (e) => {
        this.loading = false;
        showNotifyError('Error consultar información');
      }
    );
  }
}
