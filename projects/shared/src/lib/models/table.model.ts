import { DataSrc } from './dataSrc.model';

export class TableRow {
  title!: string;
  field!: string;
  type?: 'checkbox' | 'text' | 'number' | 'select' = 'text';
  placeholder?: string = 'Vui lòng điền';
  dataSrc?: DataSrc[];
  disabled?: boolean = false;

  constructor(obj: TableRow) {
    Object.assign(this, obj);
  }
}
