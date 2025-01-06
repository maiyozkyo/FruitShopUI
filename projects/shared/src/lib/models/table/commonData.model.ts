export class CommonData {
  title!: string;
  field!: string;
  type?: 'checkbox' | 'text' | 'number' | 'select' = 'text';
  placeholder?: string = 'Vui lòng điền';
  dataSrc?: any[];
  labelField?: string = '';
  valueField?: string = '';
  disabled?: boolean = false;
  icon?: string;
  iconStyle?: string;
  avatar?: string;

  constructor(obj: CommonData) {
    Object.assign(this, obj);
  }
}
