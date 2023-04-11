import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-no-found',
  templateUrl: './page-no-found.component.html',
  styleUrls: ['./page-no-found.component.scss'],
})
export class PageNoFoundComponent implements OnInit {
  constructor(public _auth: AuthService, private _router: Router) {}

  ngOnInit(): void {}

  routerLink() {
    if (this._auth.isAdmin) {
      this._router.navigate(['/admin']);
      return;
    }
    this._router.navigate(['/home']);
  }
}
