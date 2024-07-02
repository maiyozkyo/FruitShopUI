import { Injectable } from '@angular/core';
import { ADUser } from 'projects/shared/src/lib/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private readonly service = 'Auth';
  private readonly lgTokenName = 'lgUser';
  constructor() {}

  getAuth(): ADUser | undefined {
    let jsonUser = localStorage.getItem(this.lgTokenName);
    if (jsonUser) {
      return JSON.parse(jsonUser);
    }
    return undefined;
  }

  setToken(tokenName: string, tokenValue: string) {
    localStorage.setItem(tokenName, JSON.stringify(tokenValue));
  }

  setAuth(jsonUser: string) {
    this.setToken(this.lgTokenName, jsonUser);
  }

  isLoged(): boolean {
    let sLGuser = localStorage.getItem(this.lgTokenName);
    if (sLGuser) {
      let lgUser = JSON.parse(sLGuser) as ADUser;
      lgUser.tokenExpired = new Date(lgUser.tokenExpired);

      return lgUser.tokenExpired.getTime() > new Date().getTime();
    }

    return false;
  }

  getUserToken(): string {
    let sLGuser = localStorage.getItem(this.lgTokenName);
    if (sLGuser) {
      let lgUser = JSON.parse(sLGuser) as ADUser;
      return lgUser.token;
    }
    return '';
  }

  removeToken(tokenName: string) {
    localStorage.removeItem(tokenName);
  }

  logOut() {
    this.removeToken(this.lgTokenName);
  }
}
