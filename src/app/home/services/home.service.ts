import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { BrandModelo, ClienteModelo, ImagenModelo, ProductoModelo } from '../models/home.modelo';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private readonly http: HttpClient) {}

  getUsuarios(): Observable<any> {
    return this.http.get(`${environment.url}/users/read.php`);
  }

  createClient(formData: ClienteModelo): Observable<any> {
    let params = new HttpParams()
    .append('name', formData.name)
    .append('email', formData.email)
    .append('password', formData.password)
    .append('isAdmin', formData.isAdmin)
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
    return this.http.get(
      `${environment.url}/users/deleteClient.php?id=${id}`
    );
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

  singupAll(id: string, name: string, password: string): Observable<any> {
    const url = `${environment.url}/users/singupAll.php?id=${id}&name=${name}&password=${password}`;
    return this.http.get(url);
  }

  singup(email: string): Observable<any> {
    const url = `${environment.url}/users/create.php?email=${email}`;
    return this.http.get(url);
  }

  updatePwd(id: string, password: string): Observable<any> {
    const url = `${environment.url}/users/update_password.php?id=${id}&password=${password}`;
    return this.http.get(url);
  }

  // sendValidateEmail(email: string, id: string): Observable<any> {
  //   let body = {
  //     email,
  //     id,
  //   };
  //   const url = `${environment.urlEmail}/send-validate-email`;
  //   return this.http.post(url, body);
  // }

  // sendForgotEmail(email: string, id: string): Observable<any> {
  //   let body = {
  //     email,
  //     id,
  //   };
  //   const url = `${environment.urlEmail}/send-forgot-password`;
  //   return this.http.post(url, body);
  // }

  getBrands(): Observable<any> {
    return this.http.get(`${environment.url}/products/getBrands.php`);
  }

  createBrand(formData: BrandModelo, imageUrl: string): Observable<any> {
    let params = new HttpParams()
      .append('name', formData.name)
      .append('description', formData.description)
      .append('imageUrl', imageUrl);
    return this.http.get(`${environment.url}/products/createBrand.php`, {
      params,
    });
  }

  updateBrand(id: string, formData: BrandModelo, imageUrl: string): Observable<any> {
    let params = new HttpParams()
      .append('id', id)
      .append('name', formData.name)
      .append('description', formData.description)
      .append('imageUrl', imageUrl);
    return this.http.get(`${environment.url}/products/updateBrand.php`, {
      params,
    });
  }

  deleteBrand(id: string): Observable<any> {
    return this.http.get(
      `${environment.url}/products/deleteBrand.php?id=${id}`
    );
  }

  getProducts(): Observable<any> {
    return this.http.get(`${environment.url}/products/getProducts.php`);
  }

  createProduct(formData: ProductoModelo, imageUrl: string): Observable<any> {
    let params = new HttpParams()
    .append('title', formData.title)
    .append('description', formData.description)
    .append('BrandID', formData.brandID)
    .append('precio', formData.precio)
    .append('imageUrl', imageUrl);
    return this.http.get(`${environment.url}/products/createProduct.php`, {
      params,
    });
  }

  updateProduct(id: string, formData: ProductoModelo, imageUrl: string): Observable<any> {
    let params = new HttpParams()
      .append('id', id)
      .append('title', formData.title)
      .append('description', formData.description)
      .append('BrandID', formData.brandID)
      .append('precio', formData.precio)
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

  getProductsPerBrand(Brand: string): Observable<any> {
    return this.http.get(
      `${environment.url}/products/getProductsPerBrand.php?id=${Brand}`
    );
  }

  getBrand(id: string): Observable<any> {
    return this.http.get(
      `${environment.url}/products/getBrand.php?id=${id}`
    );
  }

  uploadFile(archivo: ImagenModelo) {
    return this.http.post(`${environment.url}/products/uploadImage.php`, archivo);
  }
}
