import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private _route : Router, private _auth: AuthService) { }

  ngOnInit(): void {
    if (!this._auth.isAdmin) {
      this._route.navigate(['/home'])
    }
  }

}
