export class CommonData {
  title!: string;
  field!: string;
  type?: 'checkbox' | 'text' | 'number' | 'select' | 'icon' | 'avatar' = 'text';
  placeholder?: string = 'Vui lòng điền';
  dataSrc?: any[];
  labelField?: string = '';
  valueField?: string = '';
  disabled?: boolean = false;
  style?: string;

  constructor(obj: CommonData) {
    Object.assign(this, obj);
  }
}
