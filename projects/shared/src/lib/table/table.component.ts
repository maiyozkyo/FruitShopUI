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

  curPage = 1;
  total = 0;
  request = '';
  loading = false;
  themeClass: string = 'ag-theme-quartz';
  constructor(
    private df: ChangeDetectorRef,
    private shareService: SharedService
  ) {}
  ngOnInit(): void {
    // Column Definitions: Defines & controls grid columns.
  }
  test = false;
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
}
