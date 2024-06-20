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
  total = 200;
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
  ngAfterViewInit(): void {}

  log(value: any) {
    console.log(value);
  }

  onQueryParamsChange(evt: any) {
    console.log('onQueryParamsChange', evt.pageIndex, evt.pageSize);
  }
}
