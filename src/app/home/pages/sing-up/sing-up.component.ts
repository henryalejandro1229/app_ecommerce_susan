import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClienteModelo } from '../../models/home.modelo';
import { HomeService } from '../../services/home.service';
import { showNotifyError, showNotifySuccess, showNotifyWarning, showSwalSuccess, showSwalWarning } from 'src/app/shared/functions/Utilities';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sing-up',
  templateUrl: './sing-up.component.html',
  styleUrls: ['./sing-up.component.scss'],
})
export class SingUpComponent implements OnInit {
  form!: FormGroup;
  clear: boolean = false;
  clearConfirm: boolean = false;
  objCliente!: ClienteModelo;
  pwdsCoinciden = false;
  pwdsValue = false;

  constructor(private _hs: HomeService, private _route : Router) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      edad: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      password2: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  register(): void {
    if (this.form.invalid && !this.pwdsCoinciden) {
      showNotifyWarning(
        'Complete los datos del formulario para continuar'
      );
      return;
    }
    this._hs
      .singup(this.form.value.email, this.form.value.name, this.form.value.apellido, this.form.value.edad, this.form.value.password)
      .subscribe(
        (res) => {
          showNotifySuccess('Registro completado, para continuar confirme su cuenta con el link que fue enviado a su correo');
          this._route.navigate(['/home']);
          this.validateEmail(true);
        },
        (e) => {
          showNotifyError('Error al registrar');
        }
      );
  }

  validateEmail(sendEmail = false): void {
    this._hs.validateEmail(this.form.value.email).subscribe(
      (res: any[]) => {
        if (res.length === 1) {
          let { email, _id } = res[0];
          sendEmail ? this.sendEmail(email, _id.$oid) : this.register();
          return;
        }
        if (res.length > 0) {
          console.log(res[0]._id.$oid);
          showSwalWarning(
            'Correo existente',
            'Ya existe una cuenta con el correo ingresado'
          );
          return;
        }
        this.register();
      },
      (e) => {
        showNotifyError('Error al validar el email');
      }
    );
  }

  sendEmail(email: string, id: string): void {
    console.log('sendemail');
    
    this._hs.sendValidateEmail(email, id).subscribe(
      (res: any) => {
        showSwalSuccess(
          'Correo enviado',
          'Para continuar, ingrese al enlace que fue enviado a su correo electrónico'
        );
      },
      (e) => {
        showNotifyError('Error al enviar correo');
      }
    );
  }

  validaPwds(): void {
    console.log(this.form.value.password);
    if (this.form.value.password && this.form.value.password2) {
      this.pwdsValue = true;
      this.pwdsCoinciden =
        this.form.value.password === this.form.value.password2;
      return;
    }
    this.pwdsCoinciden = false;
    this.pwdsValue = false;
    console.log(this.pwdsCoinciden);
  }
}
