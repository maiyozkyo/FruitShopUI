import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthen: boolean = false;
  constructor() {}

  getAuth() {}

  setAuth(isLoged: boolean) {
    this.isAuthen = isLoged;

    console.log('authen', this.isAuthen);
  }

  isLoged(): boolean {
    return this.isAuthen;
  }

  getToken(): string {
    return '';
  }
}
