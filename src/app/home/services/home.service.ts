import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import {
  TypeModelo,
  ClienteModelo,
  ImagenModelo,
  ProductoModelo,
  DireccionModelo,
} from '../models/home.modelo';

@Injectable({
  providedIn: 'root',
})
export class HomeService {

  private tokenCOPOMEX = "ebfae518-e174-49fc-8954-f9c6c02774dd";
  constructor(private readonly http: HttpClient) {}

  getUsuarios(): Observable<any> {
    return this.http.get(`${environment.url}/users/read.php`);
  }

  createClient(formData: ClienteModelo): Observable<any> {
    let params = new HttpParams()
      .append('name', formData.name)
      .append('email', formData.email)
      .append('password', formData.password)
      .append('isAdmin', formData.isAdmin);
    return this.http.get(`${environment.url}/users/createClient.php`, {
      params,
    });
  }

  updateClient(id: string, formData: ClienteModelo): Observable<any> {
    let params = new HttpParams()
      .append('id', id)
      .append('name', formData.name)
      .append('email', formData.email)
      .append('password', formData.password)
      .append('isAdmin', formData.isAdmin);
    return this.http.get(`${environment.url}/users/updateClient.php`, {
      params,
    });
  }

  deleteClient(id: string): Observable<any> {
    return this.http.get(`${environment.url}/users/deleteClient.php?id=${id}`);
  }

  validateEmail(email: string): Observable<any> {
    return this.http.get(
      `${environment.url}/users/read_single.php?email=${email}`
    );
  }

  getUsuario(id: string): Observable<any> {
    return this.http.get(`${environment.url}/users/getUser.php?id=${id}`);
  }

  login(email: string, password: string): Observable<any> {
    const url = `${environment.url}/users/login.php?email=${email}&password=${password}`;
    return this.http.get(url);
  }

  singup(email: string, name: string, apellido: string, edad: string, password: string, sessionGoogle: boolean): Observable<any> {
    const url = `${environment.url}/users/singup.php?name=${name}&password=${password}&email=${email}&apellido=${apellido}&edad=${edad}&sessionGoogle=${sessionGoogle}`;
    return this.http.get(url);
  }

  updatePwd(id: string, password: string): Observable<any> {
    const url = `${environment.url}/users/update_password.php?id=${id}&password=${password}`;
    return this.http.get(url);
  }

  sendValidateEmail(email: string, id: string): Observable<any> {
    let body = {
      email,
      id,
    };
    const url = `${environment.urlEmail}/send-validate-email`;
    return this.http.post(url, body);
  }

  sendForgotEmail(email: string, id: string): Observable<any> {
    let body = {
      email,
      id,
    };
    const url = `${environment.urlEmail}/send-forgot-password`;
    return this.http.post(url, body);
  }

  findProduct(
    txtSearch: string,
    min: number,
    max: number,
    type: string,
    category: string
  ): Observable<any> {
    let params = new HttpParams().append('txtSearch', txtSearch.toLowerCase()).append('typeID', type ? type : '0').append('min', min ? min : -1).append('max', max ? max : -1).append('category', category ? category : '0');
      params.append('typeID', type);
    return this.http.get(`${environment.url}/products/findProduct.php`, {
      params,
    });
  }

  getTypes(): Observable<any> {
    return this.http.get(`${environment.url}/products/getTypes.php`);
  }

  createType(formData: TypeModelo): Observable<any> {
    let params = new HttpParams()
      .append('name', formData.name)
      .append('description', formData.description);
    return this.http.get(`${environment.url}/products/createType.php`, {
      params,
    });
  }

  updateType(
    id: string,
    formData: TypeModelo
  ): Observable<any> {
    let params = new HttpParams()
      .append('id', id)
      .append('name', formData.name)
      .append('description', formData.description);
    return this.http.get(`${environment.url}/products/updateType.php`, {
      params,
    });
  }

  deleteType(id: string): Observable<any> {
    return this.http.get(`${environment.url}/products/deleteType.php?id=${id}`);
  }

  getProduct(id: string): Observable<any> {
    return this.http.get(`${environment.url}/products/getProduct.php?id=${id}`);
  }

  getProducts(): Observable<any> {
    return this.http.get(`${environment.url}/products/getProducts.php`);
  }

  createProduct(formData: ProductoModelo, imageUrl: string): Observable<any> {
    let params = new HttpParams()
      .append('title', formData.title)
      .append('description', formData.description)
      .append('typeID', formData.typeID)
      .append('precio', formData.precio)
      .append('marca', formData.marca)
      .append('imageUrl', imageUrl);
    return this.http.get(`${environment.url}/products/createProduct.php`, {
      params,
    });
  }

  updateProduct(
    id: string,
    formData: ProductoModelo,
    imageUrl: string
  ): Observable<any> {
    let params = new HttpParams()
      .append('id', id)
      .append('title', formData.title)
      .append('description', formData.description)
      .append('typeID', formData.typeID)
      .append('precio', formData.precio)
      .append('marca', formData.marca)
      .append('imageUrl', imageUrl);
    return this.http.get(`${environment.url}/products/updateProduct.php`, {
      params,
    });
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.get(
      `${environment.url}/products/deleteProduct.php?id=${id}`
    );
  }

  getProductsPerType(Type: string): Observable<any> {
    return this.http.get(
      `${environment.url}/products/getProductsPerType.php?id=${Type}`
    );
  }

  getType(id: string): Observable<any> {
    return this.http.get(`${environment.url}/products/getType.php?id=${id}`);
  }

  uploadFile(archivo: ImagenModelo) {
    return this.http.post(
      `${environment.url}/products/uploadImage.php`,
      archivo
    );
  }

  getDirecciones(clienteID: string): Observable<any> {
    return this.http.get(
      `${environment.url}/profile/getDirecciones.php?clienteID=${clienteID}`
    );
  }

  createdireccion(formData: DireccionModelo): Observable<any> {
    let params = new HttpParams()
      .append('clienteID', formData.clienteID)
      .append('nombre', formData.nombre)
      .append('estado', formData.estado)
      .append('municipio', formData.municipio)
      .append('colonia', formData.colonia)
      .append('calle', formData.calle)
      .append('telefono', formData.telefono)
      .append('indicaciones', formData.indicaciones);
    return this.http.get(`${environment.url}/profile/createDireccion.php`, {
      params,
    });
  }

  updateDireccion(id: string, formData: DireccionModelo): Observable<any> {
    let params = new HttpParams()
      .append('id', id)
      .append('clienteID', formData.clienteID)
      .append('nombre', formData.nombre)
      .append('estado', formData.estado)
      .append('municipio', formData.municipio)
      .append('colonia', formData.colonia)
      .append('calle', formData.calle)
      .append('telefono', formData.telefono)
      .append('indicaciones', formData.indicaciones);
    return this.http.get(`${environment.url}/profile/updateDireccion.php`, {
      params,
    });
  }

  deleteDireccion(id: string): Observable<any> {
    return this.http.get(
      `${environment.url}/profile/deleteDireccion.php?id=${id}`
    );
  }

  getColonias(mpio: string): Observable<any> {
    return this.http.get(`${environment.urlCOPOMEX}/get_colonia_por_municipio/${mpio}?token=${this.tokenCOPOMEX}`);
  }

  getMunicipios(estado: string): Observable<any> {
    return this.http.get(`${environment.urlCOPOMEX}/get_municipio_por_estado/${estado}?token=${this.tokenCOPOMEX}`);
  }

  getEdoPorCP(CP: string): Observable<any> {
    return this.http.get(`${environment.urlCOPOMEX}/info_cp/${CP}?token=${this.tokenCOPOMEX}`);
  }

  getEdos(): Observable<any> {
    return this.http.get(`${environment.urlCOPOMEX}/get_estados?token=${this.tokenCOPOMEX}`);
  }
}
