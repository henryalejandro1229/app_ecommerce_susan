import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuth = false;
  public isAdmin = false;

  constructor() {}

  getTokenLocalStorage() {
    return localStorage.getItem('token') ? localStorage.getItem('token') : '';
  }

  setTokenLocalStorage(token: string) {
    this.isAuth = true;
    return localStorage.setItem('token', token);
  }

  setIsAdminLS(value: string) {
    this.isAdmin = value === 'true' ? true : false;
    return localStorage.setItem('isAdmin', value);
  }

  logout() {
    this.isAuth = false;
    this.isAdmin = false;
    return localStorage.removeItem('token');
  }
}
