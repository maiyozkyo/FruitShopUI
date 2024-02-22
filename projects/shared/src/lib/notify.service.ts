import { Injectable, TemplateRef } from '@angular/core';
import { Noti } from './models/noti.model';

@Injectable({
  providedIn: 'root',
})
export class NotifyService {
  private noties: Noti[] = [];
  constructor() {}

  show(
    type: string,
    title: string,
    msg: string,
    template?: TemplateRef<HTMLElement>
  ) {
    let noti: Noti = {
      type: type,
      title: title,
      msg: msg,
      template: template,
    };
    switch (noti.type) {
      case 'error': {
        noti.className.push('bg-danger text-light');
        break;
      }
      case 'success': {
        noti.className.push('bg-success text-light');
        break;
      }
      default: {
        break;
      }
    }
    this.noties.push(noti);
  }

  remove(noti: Noti) {
    this.noties = this.noties.filter((t) => t !== noti);
  }

  clear() {
    this.noties.splice(0, this.noties.length);
  }
}
