import { ValidatorFn, Validators } from '@angular/forms';
import { PageInfo } from '../paging/page-info.model';

export class ControlItem {
  errorMsg?: string = 'Vui lòng điền';
  controlName!: string;
  title: string = '';
  value!: any;
  validators?: ValidatorFn[] = [];
  placeHolder?: string = '';
  type?: 'checkbox' | 'text' | 'number' | 'select' | 'switch' | 'password' =
    'text';
  dataSrc?: any[];
  disabled? = false;
  hidden? = false;
  labelField?: string = '';
  valueField?: string = '';
  icon?: string = '';
  isServer?: boolean = false;
  pageInfo?: PageInfo;

  constructor(control: ControlItem) {
    Object.assign(this, control);
    if (!this.placeHolder) this.placeHolder = this.title;
    this.errorMsg += ` ${this.title.toLowerCase()}`;
  }
}
