import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ControlItem } from '../models/form/control-item.model';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'lib-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent implements OnInit, OnChanges {
  @Input() visible: boolean = false;
  @Input() isOkLoading: boolean = false;
  @Input() title: string = '';
  @Input() contentText: string = '';
  @Input() confirmText: string = 'OK';
  @Input() cancelText: string = 'Hủy';
  @Input() contentTmpl?: TemplateRef<any>;
  @Input() footerTmpl?: TemplateRef<any>;
  @Input() controls?: ControlItem[] = [];
  @Input() data: any;
  tempData: any;
  @Input() formGroup!: FormGroup;
  @Input() width!: number;
  @Input() height!: number;
  @Input() showConfirm = false;
  @Output() onCancel = new EventEmitter();
  @Output() onConfirm = new EventEmitter();
  @Output() visibleChange = new EventEmitter<boolean>();

  confirmModal?: NzModalRef;
  constructor(private modal: NzModalService) {}
  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['visible'] && !this.title) {
      if (this.data?.recID) this.title = 'Chỉnh sửa';
      else {
        this.title = 'Thêm mới';
        this.tempData = { ...this.data };
      }
    }
  }

  handleCancel() {
    this.changeVisible();
  }

  handleOk() {
    this.changeVisible(true);
  }

  changeVisible(isConfirm: boolean = false) {
    if (this.showConfirm) {
      this.confirmModal = this.modal.confirm({
        nzTitle: this.title,
        nzContent: this.contentText,
        nzOnOk: () => {
          this.visible = false;
          this.visibleChange.emit(this.visible);
        },
      });
    } else {
      if (isConfirm) {
        Object.keys(this.formGroup.controls).forEach((key, idx) => {
          this.tempData[key] = this.formGroup.controls[key].value;
        });
        this.onConfirm.emit(this.tempData);
      } else this.onCancel.emit(null);
      this.visible = false;
      this.visibleChange.emit(this.visible);
    }
  }
}
