import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-process',
  templateUrl: './register-process.component.html',
  styleUrls: ['./register-process.component.scss']
})
export class RegisterProcessComponent implements OnInit {

  form!: FormGroup;
  clear: boolean = false;

  constructor() {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  registrarme() {

  }

}
