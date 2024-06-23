import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() controls: FormItem[] = [
    {
      controlName: 'userName',
      title: 'Tên đăng nhập',
      value: '',
      type: 'text',
      validators: [Validators.required],
    },
  ];
  @Input() layout: NzFormLayoutType = 'vertical';
  //#endregion

  //#region Event
  @Output() submit!: EventEmitter<any>;
  //#endregion

  fg!: FormGroup;

  //#endregion
  constructor() {}

  ngOnInit(): void {
    this.fg = new FormGroup({
      userName: new FormControl('', [Validators.required]),
    });
  }
}
