import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NzDateMode, NzDatePickerSizeType } from 'ng-zorro-antd/date-picker';

@Component({
  selector: 'lib-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
})
export class DatePickerComponent implements OnInit {
  @Input() fromDate: Date = new Date();
  @Input() toDate: Date = new Date();
  @Input() mode: NzDateMode = 'date';
  @Input() size: NzDatePickerSizeType = 'default';
  @Input() format = 'dd/MM/yyyy';
  //Khoảng cách giữa ngày bắt đầu và ngày kết thúc
  @Input() range: number = 0;

  @Output() fromDateChange = new EventEmitter<Date>();
  @Output() toDateChange = new EventEmitter<Date>();
  @Output() dateChanged = new EventEmitter<any>();
  dates: Date[] = [];

  constructor() {}
  ngOnInit(): void {
    this.fromDate.setDate(this.toDate.getDate() - this.range);
    this.dates = [this.fromDate, this.toDate];
  }

  onChange(result: Date[]): void {
    this.fromDate = result[0];
    this.toDate = result[1];
    this.fromDateChange.emit(this.fromDate);
    this.toDateChange.emit(this.toDate);
    this.dateChanged.emit(this.dates);
  }
}
