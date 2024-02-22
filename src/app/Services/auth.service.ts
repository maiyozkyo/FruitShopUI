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
    let sLGuser = localStorage.getItem('lgUser');
    if (sLGuser) {
      let lgUser = JSON.parse(sLGuser) as User;
      lgUser.tokenExpired = new Date(lgUser.tokenExpired)
      
      return lgUser.tokenExpired.getTime() > new Date().getTime();
    }

    return false;
  }

  getToken(): string {
    return '';
  }

  logout() {
    localStorage.removeItem('lgUser');
  }
}
