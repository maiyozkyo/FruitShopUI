import { Component, OnInit } from '@angular/core';
import { TableRow } from 'projects/shared/src/lib/models/tableRow.model';

@Component({
  selector: 'lib-customer-main',
  templateUrl: './customer-main.component.html',
  styleUrls: ['./customer-main.component.scss'],
})
export class CustomerMainComponent implements OnInit {
  tableDisabled: boolean = false;
  tableRows: TableRow[] = [];
  tableService = 'Customer';
  tableMethod = 'TableCustomers';
  ngOnInit() {
    this.tableRows = [
      {
        field: 'name',
        title: 'Họ tên',
      },
      {
        field: 'nickName',
        title: 'Biệt danh',
      },
      {
        field: 'phone',
        title: 'Số điện thoại',
      },
      {
        field: 'Address',
        title: 'Địa chỉ',
      },
      {
        field: 'Note',
        title: 'Ghi chú',
      },
    ];
  }

  addCustomer() {}
}
