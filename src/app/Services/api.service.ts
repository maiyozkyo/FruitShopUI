import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private domain = '';
  private gatewayPort = '';
  constructor(private http: HttpClient, private authService: AuthService) {
    this.domain = environment.domain;
    this.gatewayPort = environment.gatewayPort;
  }

  post(service: string, method: string, data: any) {
    let token = this.authService.getToken();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    if (token != '') {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }

    let body = {
      Method: method,
      Params: JSON.stringify(data),
    };
    let url = `${this.domain}:${this.gatewayPort}/${service}/${method}`;
    return this.http.post(url, JSON.stringify(body), {
      headers,
      withCredentials: true,
    });
  }
}
