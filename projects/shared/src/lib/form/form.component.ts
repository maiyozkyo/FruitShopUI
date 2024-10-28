import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NzFormLayoutType } from 'ng-zorro-antd/form';
import { ControlItem } from '../models/form/control-item.model';
import { SharedService } from '../shared.service';

@Component({
  selector: 'lib-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  //#region Input Params
  @Input() controls!: ControlItem[];
  @Input() layout: NzFormLayoutType = 'vertical';
  @Input() data!: any;
  //#endregion

  //#region Event
  @Output() submit!: EventEmitter<any>;
  @Output() fgChange = new EventEmitter<any>();
  //#endregion

  @Input() fg!: FormGroup;

  @ViewChild('form', { static: true }) form!: TemplateRef<any>;
  constructor(
    private df: ChangeDetectorRef,
    private shareService: SharedService
  ) {}

  ngOnInit(): void {
    if (this.controls) {
      this.controls.forEach((control) => {
        if (!control.placeHolder) {
          control.placeHolder = control.title;
        }
        if (this.data && this.data[control.controlName]) {
          this.fg.controls[control.controlName].setValue(
            this.data[control.controlName]
          );
        }
      });

      this.controls
        .filter((control) => control.isServer)
        .forEach((control) => this.dropdownServerLoadData(control));
    }
  }

  dropdownServerLoadData(control: ControlItem) {
    if (control.pageInfo) {
      control.pageInfo.isLoading = true;
      this.shareService
        .getDataPaging(
          control.pageInfo.service,
          control.pageInfo.method,
          control.pageInfo.curPage,
          control.pageInfo.size ?? 20,
          control.pageInfo.request ?? ''
        )
        .subscribe((res) => {
          control.dataSrc = res.data;
          if (control.pageInfo) control.pageInfo.isLoading = false;
        });
    }
  }
}
