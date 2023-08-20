import { Injectable } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isAuth = false;
  public isAdmin = false;
  public token = '';

  constructor(private auth: Auth) {
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
    localStorage.removeItem('token');
    localStorage.removeItem('isAdmin');
  }

  getSesion() {
    let token = this.getTokenLocalStorage();
    if(token) {
      this.isAuth = true;
      this.token = token;
    }
    else 
      this.isAuth = false;
    this.isAdmin = this.getIsAdminLocalStorage() === 'true';
  }

  loginWithGoogle() {
    return signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  logoutFirebase() {
    return signOut(this.auth);
  }
}
