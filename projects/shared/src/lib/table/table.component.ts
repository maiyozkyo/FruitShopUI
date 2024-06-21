import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { TableRow } from '../models/table.model';
import { NzTableSize } from 'ng-zorro-antd/table';
import { SharedService } from '../shared.service';
import { TableData } from '../models/tableData.model';

@Component({
  selector: 'lib-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, AfterViewInit {
  @Input() data: any[] = [];
  @Input() tableRows: TableRow[] = [];
  @Input() tableSize: NzTableSize = 'default';
  @Input() pageSize = 20;
  @Input() disabled: boolean = false;
  @Input() service!: string;
  @Input() method!: string;
  @Input() allowAdd: boolean = true;

  curPage = 1;
  total = 0;
  request = '';
  loading = false;
  themeClass: string = 'ag-theme-quartz';
  constructor(
    private df: ChangeDetectorRef,
    private shareService: SharedService
  ) {
    
  }
  ngOnInit(): void {
    this.tableRows.forEach(row => {
      Object.assign(row, new TableRow());
    }
    )
    console.log(this.tableRows)
    this.addNewRow();
  }
  ngAfterViewInit(): void {
    this.getTableDatas();
  }

  log(value: any) {
    console.log(value);
  }

  onQueryParamsChange(evt: any) {
    this.curPage = evt.pageIndex;
    this.pageSize = evt.pageSize;
    this.getTableDatas();
  }

  getTableDatas() {
    if (this.method && this.service) {
      this.shareService
        .getDataPaging(
          this.service,
          this.method,
          this.curPage,
          this.pageSize,
          this.request
        )
        .subscribe((res: TableData) => {
          console.log('res', res);
          this.total = res.total;
          this.data = res.data;
        });
    }
  }

  addNewRow() {
    let obj: any = {};
    this.tableRows.forEach((row) => {
      switch (row.type) {
        case 'checkbox': {
          obj[row.field] = false;
          break;
        }
        case 'number': {
          obj[row.field] = 0;
          break;
        }
        case 'select': {
          obj[row.field] = row.dataSrc ? row.dataSrc[0] : null;
          break;
        }
        case 'text': 
        default: {
          obj[row.field] = '';
          break;
        }
      }
    });
    this.data.push(obj);
    this.df.detectChanges();
  }
}
