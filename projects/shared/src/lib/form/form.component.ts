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
  constructor(private df: ChangeDetectorRef) {}

  ngOnInit(): void {
    if (this.data && this.controls) {
      this.controls.forEach((control) => {
        if (!control.placeHolder) {
          control.placeHolder = control.title;
        }
        if (this.data[control.controlName]) {
          this.fg.controls[control.controlName].setValue(
            this.data[control.controlName]
          );
        }
      });
    }
  }
}
