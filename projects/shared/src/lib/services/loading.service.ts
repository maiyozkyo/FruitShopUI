import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  constructor() {}
  isShow = false;
  show() {
    this.isShow = true;
  }

  hide() {
    this.isShow = false;
  }
}
