import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuth = false;
  public isAdmin = false;

  constructor() {
    this.getSesion();
  }

  getTokenLocalStorage() {
    return localStorage.getItem('token') ? localStorage.getItem('token') : '';
  }

  getIsAdminLocalStorage() {
    return localStorage.getItem('isAdmin') ? localStorage.getItem('isAdmin') : '';
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

  getSesion() {
    let token = this.getTokenLocalStorage();
    this.isAuth = token? token.length > 0 : false;
    this.isAdmin = this.getIsAdminLocalStorage() === 'true';
  }
}
