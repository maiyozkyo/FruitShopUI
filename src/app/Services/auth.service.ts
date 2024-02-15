import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthen: boolean = true;
  constructor() {}

  getAuth() {}

  setAuth(jsonUser: string) {}

  isLoged(): boolean {
    return this.isAuthen;
  }

  getToken(): string {
    return '';
  }
}
