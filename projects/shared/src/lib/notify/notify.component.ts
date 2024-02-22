import { Component, Input, OnDestroy, TemplateRef } from '@angular/core';
import { NotifyService } from '../notify.service';
import { Noti } from '../models/noti.model';

@Component({
  selector: 'lib-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css'],
})
export class NotifyComponent implements OnDestroy {
  @Input() type: string = 'success';
  @Input() title: string = 'Thông báo';
  @Input() msg: string = '';
  @Input() template!: TemplateRef<HTMLElement>;
  @Input() noti!: Noti;

  constructor(private notiService: NotifyService) {}
  ngOnDestroy(): void {
    this.notiService.clear();
  }

  removeNoti(noti: Noti) {
    this.notiService.remove(noti);
  }
}
