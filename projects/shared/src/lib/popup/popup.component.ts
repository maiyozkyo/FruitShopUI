import {
  ChangeDetectorRef,
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
  @Input() isRemove: boolean = false;
  @Input() title: string = '';
  isEmptyTitle = true;
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
  constructor(private modal: NzModalService, private df: ChangeDetectorRef) {}
  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['title']) {
      this.isEmptyTitle = this.title ? false : true;
    }

    if (changes['visible']) {
      let isNew = this.data?.recID ? false : true;
      if (this.isEmptyTitle) {
        if (this.data?.recID) {
          this.title = 'Chỉnh sửa';
        } else {
          this.title = 'Thêm mới';
        }
      }

      this.controls
        ?.filter((c) => c.disabledOnEdit)
        .forEach((c) => {
          if (isNew) this.formGroup.controls[c.controlName].enable();
          else this.formGroup.controls[c.controlName].disable();
        });
      this.tempData = { ...this.data };
      this.formGroup.patchValue(this.tempData);
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
