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
    this.data = [
      { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
      { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
      { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
      { make: 'Mercedes', model: 'EQA', price: 48890, electric: true },
      { make: 'Fiat', model: '500', price: 15774, electric: false },
      { make: 'Nissan', model: 'Juke', price: 20675, electric: false },
    ];

    // Column Definitions: Defines & controls grid columns.
  }

  ngAfterViewInit(): void {}
}
