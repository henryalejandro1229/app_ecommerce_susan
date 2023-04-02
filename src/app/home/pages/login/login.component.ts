import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HomeService } from '../../services/home.service';
import { ClienteModelo } from '../../models/home.modelo';
import { showNotifyError, showNotifySuccess, showNotifyWarning } from 'src/app/shared/functions/Utilities';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  clear: boolean = false;

  constructor(private _hs: HomeService, private _auth: AuthService, private router: Router) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  login() {
    if (this.form.valid) {
      this._hs
        .login(this.form.value.email, this.form.value.password)
        .subscribe(
          (res: ClienteModelo[]) => {
            if (res.length > 0) {
              let token: string = res[0]._id.$oid;
              showNotifySuccess('Bienvenido');
              this._auth.setTokenLocalStorage(token);
              if (res[0].isAdmin) {
                this._auth.setIsAdminLS('true');
                this.router.navigate(['/admin']);
              } else {
                this._auth.setIsAdminLS('false');
                this.router.navigate(['/home']);
              }
            } else {
              showNotifyWarning(
                'Email o contraseña incorrectos'
              );
            }
          },
          (e) => {
            showNotifyError('Error al iniciar sesión');
          }
        );
    }
  }

}
