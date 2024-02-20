import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly service = 'User';
  constructor(private apiService: ApiService) {}

  login(phone: string, password: string) {
    return this.apiService.post(this.service, 'LoginAsync', [phone, password]);
  }

  register(phone: string, password: string) {
    return this.apiService.post(this.service, 'RegisterAsync', [
      phone,
      password,
    ]);
  }
}
