import { Component, Input, OnDestroy, TemplateRef } from '@angular/core';
import { NotifyService } from '../services/notify.service';
import { Noti } from '../models/noti.model';

@Component({
  selector: 'lib-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css'],
})
export class NotifyComponent implements OnDestroy {
  constructor(protected notiService: NotifyService) {}
  ngOnDestroy(): void {
    this.notiService.clear();
  }

  removeNoti(noti: Noti) {
    this.notiService.remove(noti);
  }
}
