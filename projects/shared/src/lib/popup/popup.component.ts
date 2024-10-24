import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormItem } from '../models/form/formItem.model';

@Component({
  selector: 'lib-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent implements OnInit {
  @Input() visible: boolean = false;
  @Input() isOkLoading: boolean = false;
  @Input() title: string = '';
  @Input() confirmText: string = 'OK';
  @Input() cancelText: string = 'Hủy';
  @Input() contentTmpl?: TemplateRef<any>;
  @Input() controls?: FormItem[] = [];
  @Input() data: any;
  tempData: any;
  @Input() formGroup!: FormGroup;
  @Input() width!: number;
  @Input() height!: number;
  @Output() onCancel = new EventEmitter();
  @Output() onConfirm = new EventEmitter();
  @Output() visibleChange = new EventEmitter<boolean>();

  constructor() {}
  ngOnInit(): void {
    this.tempData = { ...this.data };
  }

  handleCancel() {
    this.changeVisible();
  }

  handleOk() {
    this.changeVisible(true);
  }

  changeVisible(isConfirm: boolean = false) {
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
