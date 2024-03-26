import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'lib-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit, AfterViewInit {
  @Input() data: any[] = [];

  themeClass: string = 'ag-theme-quartz';
  constructor(private df: ChangeDetectorRef) {}
  ngOnInit(): void {
    // Column Definitions: Defines & controls grid columns.
  }
  test = false;
  ngAfterViewInit(): void {}

  getTypeof(value: any): string {
    switch (typeof value) {
      case 'boolean': {
        return 'checkbox';
      }
      default: {
        return typeof value;
      }
    }
  }
  log(value: any) {
    console.log(typeof value);
  }
}
