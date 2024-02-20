import { Injectable } from '@angular/core';
import { User } from 'projects/shared/src/lib/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor() {}

  getAuth(): User | undefined {
    let jsonUser = localStorage.getItem('lgUser');
    if (jsonUser) {
      return JSON.parse(jsonUser);
    }
    return undefined;
  }

  setAuth(jsonUser: string) {
    localStorage.setItem('lgUser', JSON.stringify(jsonUser));
  }

  isLoged(): boolean {
    let isAuthen = localStorage.getItem('lgUser') ? true : false;
    return isAuthen;
  }

  getToken(): string {
    return '';
  }

  logout() {
    localStorage.removeItem('lgUser');
  }
}
