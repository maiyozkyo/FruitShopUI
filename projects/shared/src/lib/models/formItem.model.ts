import { ValidatorFn, Validators } from '@angular/forms';
import { DataSrc } from './dataSrc.model';

export class FormItem {
  errorMsg?: string = 'Vui lòng điền';
  controlName!: string;
  title: string = '';
  value!: any;
  validators?: ValidatorFn[] = [];
  placeHolder?: string = '';
  type?: 'checkbox' | 'text' | 'number' | 'select' | 'switch' = 'text';
  dataSrc?: DataSrc[];
  disabled? = false;

  constructor(control: FormItem) {
    Object.assign(this, control);
    if (!this.placeHolder) this.placeHolder = this.title;
  }
}
