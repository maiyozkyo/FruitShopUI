import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzModalModule } from 'ng-zorro-antd/modal';

@Component({
  selector: 'lib-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent implements OnInit {
  @Input() isVisible: boolean = false;
  @Input() isOkLoading: boolean = false;
  @Input() title: string = '';
  @Output() onCancel = new EventEmitter();
  @Output() onConfirm = new EventEmitter();
  @Output() isVisibleChange = new EventEmitter<boolean>();

  ngOnInit(): void {}

  handleCancel() {
    this.changeVisible();
  }

  handleOk() {
    this.changeVisible(true);
  }

  changeVisible(isConfirm: boolean = false) {
    if (isConfirm) this.onConfirm.emit(1);
    else this.onCancel.emit(0);
    this.isVisible = false;
    this.isVisibleChange.emit(this.isVisible);
  }
}
