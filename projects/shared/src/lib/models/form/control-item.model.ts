import { ValidatorFn, Validators } from '@angular/forms';
import { PageInfo } from '../paging/page-info.model';

export class ControlItem {
  errorMsg?: string = 'Vui lòng điền';
  controlName!: string;
  title: string = '';
  value!: any;
  validators?: ValidatorFn[] = [];
  placeHolder?: string = '';
  type?:
    | 'checkbox'
    | 'text'
    | 'number'
    | 'select'
    | 'switch'
    | 'password'
    | 'upload' = 'text';
  dataSrc?: any[];
  disabled? = false;
  disabledOnEdit? = false;
  hidden? = false;
  hiddenValue? = false;
  labelField?: string = '';
  valueField?: string = '';
  icon?: string = '';
  //#region Use for Server
  isServer?: boolean = false;
  pageInfo?: PageInfo;
  //#endregion

  //#region Use fro mapping with other field
  mappingWithControl?: string = '';
  //#endregion

  constructor(control: ControlItem) {
    Object.assign(this, control);
    if (!this.placeHolder) this.placeHolder = this.title;
    this.errorMsg += ` ${this.title.toLowerCase()}`;
  }
}
