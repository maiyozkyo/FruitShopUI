import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  DoCheck,
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
import { PopupOption } from '../models/popup/popup-option.model';

@Component({
  selector: 'lib-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent
  implements OnInit, OnChanges, AfterViewInit, DoCheck
{
  @Input() title: string = '';
  isEmptyTitle = true;
  @Input() contentText?: string = '';
  @Input() contentTmpl?: TemplateRef<any>;
  @Input() footerTmpl?: TemplateRef<any>;
  @Input() controls?: ControlItem[] = [];
  @Input() data: any;
  tempData: any;
  @Input() formGroup!: FormGroup;
  @Input() showConfirm = false;
  @Input() popupOption: PopupOption = new PopupOption();
  preVisibleState: boolean = false;

  @Output() onCancel = new EventEmitter();
  @Output() onConfirm = new EventEmitter();
  @Output() visibleChange = new EventEmitter<boolean>();

  confirmModal?: NzModalRef;
  constructor(private modal: NzModalService, private df: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.setSize();
  }

  ngDoCheck(): void {
    if (this.popupOption.showPopup != this.preVisibleState) {
      this.preVisibleState = this.popupOption.showPopup;
      if (this.popupOption.showPopup) {
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
        if (this.data) {
          this.tempData = { ...this.data };
          this.formGroup.patchValue(this.tempData);
        } else this.formGroup.reset();
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['title']) {
      this.isEmptyTitle = this.title ? false : true;
    }
  }

  ngAfterViewInit() {
    this.setSize();
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
          this.popupOption.showPopup = false;
          this.visibleChange.emit(this.popupOption.showPopup);
        },
      });
    } else {
      if (isConfirm) {
        Object.keys(this.formGroup.controls).forEach((key, idx) => {
          this.tempData[key] = this.formGroup.controls[key].value;
        });
        this.onConfirm.emit(this.tempData);
      } else this.onCancel.emit(null);
      this.popupOption.showPopup = false;
      this.visibleChange.emit(this.popupOption.showPopup);
    }
  }

  private setSize() {
    if (this.popupOption.height > window.innerHeight)
      this.popupOption.height = window.innerHeight * 0.7;
    if (this.popupOption.width > window.innerWidth)
      this.popupOption.width = window.innerWidth * 0.7;

    this.df.detectChanges();
  }
}
