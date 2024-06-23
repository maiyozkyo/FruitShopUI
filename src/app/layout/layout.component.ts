import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../Services/api.service';
import { AuthService } from 'projects/auth/src/public-api';
import { ADUser } from 'projects/shared/src/lib/models/user.model';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    private router: Router
  ) {}
  user: ADUser | undefined;
  ngOnInit(): void {
    console.log('ngOnInit', this.user);
  }

  logout() {}
}
