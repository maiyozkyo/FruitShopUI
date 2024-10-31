import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { TokenService } from 'src/app/Services/token.service';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly service = environment.authService;
  constructor(
    private apiService: ApiService,
    private tokenService: TokenService
  ) {}

  login(phone: string, password: string) {
    return this.apiService.post(this.service, 'LoginAsync', [phone, password]);
  }
}
