import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzFormLayoutType } from 'ng-zorro-antd/form';
import { FormItem } from '../models/formItem.model';

@Component({
  selector: 'lib-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit {
  //#region Input Params
  @Input() controls!: FormItem[];
  @Input() layout: NzFormLayoutType = 'vertical';
  //#endregion

  //#region Event
  @Output() submit!: EventEmitter<any>;
  @Output() fgChange = new EventEmitter<any>();
  //#endregion

  @Input() fg!: FormGroup;
  constructor(private df: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.fg = new FormGroup({});
    this.controls = this.controls.map(
      (control) => (control = new FormItem(control))
    );
    this.controls.forEach((control) => {
      this.fg.addControl(
        control.controlName,
        new FormControl(control.value, control.validators)
      );
    });
    this.fgChange.emit(this.fg);
  }
}
