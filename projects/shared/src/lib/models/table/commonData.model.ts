export class CommonData {
  title!: string;
  field!: string;
  type?:
    | 'checkbox'
    | 'text'
    | 'number'
    | 'select'
    | 'icon'
    | 'avatar'
    | 'cover'
    | 'date'
    | 'title' = 'text';
  placeholder?: string = 'Vui lòng điền';
  dataSrc?: any[];
  labelField?: string = '';
  valueField?: string = '';
  disabled?: boolean = false;
  style?: string;
  showOnChoose?: boolean = false;
  editOnChoose?: boolean = false;
  autoCalculate?: boolean = false;
  expression?: string = '';
  minVal?: number;
  maxVal?: number;
  hidden?: boolean = false;
  class?: string | undefined;
  format?: string = '';

  constructor(obj: CommonData) {
    Object.assign(this, obj);
  }
}
