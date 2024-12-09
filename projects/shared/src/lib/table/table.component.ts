import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { NzTableSize } from 'ng-zorro-antd/table';
import { SharedService } from '../shared.service';
import { TableData } from '../models/table/tableData.model';
import { TableRow } from '../models/table/tableRow.model';

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
  @Input() filter: any = {};
  @Input() lstNotIn: any[] = [];

  @Output() save = new EventEmitter<any>();
  @Output() dataChange = new EventEmitter<any>();
  // View Element
  @ViewChild('tableInfo') tableInfo!: ElementRef<HTMLElement>;

  // Init some value
  curPage = 1;
  total = 200;
  request = '';
  loading = false;
  themeClass: string = 'ag-theme-quartz';
  tableMaxHeight: number = 1;

  constructor(
    private df: ChangeDetectorRef,
    private shareService: SharedService
  ) {}

  ngOnInit(): void {
    this.tableRows = this.tableRows.map((row) => (row = new TableRow(row)));
  }
  ngAfterViewInit(): void {
    this.setTableHeight();
  }

  setTableHeight() {
    if (this.tableInfo.nativeElement.children.length > 0) {
      let parent = this.tableInfo.nativeElement;
      let fChild = this.tableInfo.nativeElement.children.item(0) as HTMLElement;
      this.tableMaxHeight = (parent.offsetHeight - fChild.offsetHeight) * 0.75;
    } else {
      this.tableMaxHeight = 100;
    }
    this.df.detectChanges();
  }

  onQueryParamsChange(evt?: any) {
    if (evt) {
      this.curPage = evt.pageIndex;
      this.pageSize = evt.pageSize;
    }
    this.loading = true;
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
          this.request,
          this.lstNotIn,
          this.filter
        )
        .subscribe((res: TableData) => {
          console.log('res', res);
          this.total = res.total;
          this.data = res.data;
          this.loading = false;
          this.dataChange.emit(this.data);
        });
    } else {
      this.loading = false;
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
    this.data = [...this.data, obj];
    this.total++;
    this.setTableHeight();
  }

  onSaveClick() {
    this.save.emit(this.data);
  }

  reload() {
    this.onQueryParamsChange();
  }
}
