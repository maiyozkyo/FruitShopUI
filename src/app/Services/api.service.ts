import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private domain = '';
  private gatewayPort = '';
  constructor(private http: HttpClient, private tokenService: TokenService) {
    this.domain = environment.domain;
    this.gatewayPort = environment.gatewayPort;
  }

  post(
    service: string,
    assembly: string,
    method: string,
    data: any,
    action = ''
  ) {
    let token = this.tokenService.getUserToken();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    if (token != '') {
      headers = headers.append('Authorization', `Bearer ${token}`);
    }

    let body = {
      Service: service,
      Assembly: assembly,
      Method: method,
      Action: action,
      Params: JSON.stringify(data),
    };
    let url = `${this.domain}:${this.gatewayPort}/${service}/${method}`;
    return this.http.post(url, JSON.stringify(body), {
      headers,
      withCredentials: true,
    });
  }
}
