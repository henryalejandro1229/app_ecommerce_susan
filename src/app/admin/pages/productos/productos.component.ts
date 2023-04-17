import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProductoModelo, TypeModelo } from 'src/app/home/models/home.modelo';
import { HomeService } from 'src/app/home/services/home.service';
import { showModalConfirmation, showNotifyError, showNotifySuccess } from 'src/app/shared/functions/Utilities';
import { ModalProductosComponent } from '../../components/modal-productos/modal-productos.component';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {
  loading = false;
  displayedColumns: string[] = [
    'position',
    'name',
    'description',
    'categoria',
    'marca',
    'precio',
    'options',
  ];
  objProducts!: ProductoModelo[];
  objTypes!: TypeModelo[];

  constructor(private _hs: HomeService, private matDialog: MatDialog) {}

  ngOnInit(): void {
    this.consultaInfo();
  }

  consultaInfo(): void {
    this.loading = true;
    this._hs.getProducts().subscribe(
      (res: ProductoModelo[]) => {
        this.objProducts = res;
        this.loading = false;
      },
      (e) => {
        this.loading = false;
        showNotifyError('Error consultar información');
      }
    );
    this._hs.getTypes().subscribe(
      (res: TypeModelo[]) => {
        this.objTypes = res;
        this.loading = false;
      },
      (e) => {
        this.loading = false;
        showNotifyError('Error consultar información');
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

  openModal(isNew: boolean, producto?: ProductoModelo) {
    this.matDialog
      .open(ModalProductosComponent, {
        panelClass: 'sinpadding',
        width: '800px',
        height: 'auto',
        data: {
          isNew,
          objProduct: producto,
        },
      })
      .afterClosed()
      .subscribe((res) => {
        console.log(res);
        
        if (res) this.consultaInfo();
      });
  }

  deleteProduct(producto: ProductoModelo) {
    showModalConfirmation(
      'Eliminar producto',
      '¿Seguro que deseas eliminar este producto?'
    ).then((res) => {
      if (res.isConfirmed) {
        this.loading = true;
        this._hs.deleteProduct(producto._id.$oid).subscribe(
          (res) => {
            this.loading = false;
            showNotifySuccess(
              'Producto eliminado'
            );
            this.consultaInfo();
          },
          (e) => {
            this.loading = false;
            showNotifyError('Error al eliminar producto');
          }
        );
      }
    });
  }

  getTalla(talla: string): string {
    return talla ? talla.toUpperCase() : '--';
  }

}
