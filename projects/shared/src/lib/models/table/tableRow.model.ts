export class TableRow {
  title!: string;
  field!: string;
  type?: 'checkbox' | 'text' | 'number' | 'select' = 'text';
  placeholder?: string = 'Vui lòng điền';
  dataSrc?: any[];
  labelField?: string = '';
  valueField?: string = '';
  disabled?: boolean = false;

  constructor(obj: TableRow) {
    Object.assign(this, obj);
  }
}
