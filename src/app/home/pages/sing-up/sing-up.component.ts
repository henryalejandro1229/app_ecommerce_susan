import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClienteModelo } from '../../models/home.modelo';
import { HomeService } from '../../services/home.service';
import { showNotifyError, showNotifySuccess, showNotifyWarning } from 'src/app/shared/functions/Utilities';

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

  constructor(private _hs: HomeService) {
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

  registrarme(): void {
    if (this.form.invalid && !this.pwdsCoinciden) {
      showNotifyWarning(
        'Complete los datos del formulario para continuar'
      );
      return;
    }
    
    let id: string = this.objCliente._id.$oid;
    this._hs
      .singupAll(id, this.form.value.name, this.form.value.password)
      .subscribe(
        (res) => {
          showNotifySuccess('Registro completado, para continuar confirme su cuenta con el link que fue enviado a su correo');
          // this._router.navigate(['/home']);
        },
        (e) => {
          showNotifyError('Error al registrar');
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
