import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private domain = '';
  constructor(private http: HttpClient, private authService: AuthService) {
    this.domain = environment.domain;
  }

  post(data: any) {
    let token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });
    return this.http.post(this.domain, JSON.stringify(data), { headers });
  }
}
