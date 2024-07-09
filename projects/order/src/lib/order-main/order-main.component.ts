import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Custom_Date_Format } from '../mat-date-format/custom-date-format.model';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { OrderService } from '../order.service';
import { TableRow } from 'projects/shared/src/lib/models/tableRow.model';
import { NotifyService } from 'projects/shared/src/lib/services/notify.service';
import { CustomerService } from 'projects/customer/src/public-api';
import { OROrder } from '../models/order.model';
import { CUCustomer } from 'projects/customer/src/lib/models/customer.model';
import { TableData } from 'projects/shared/src/lib/models/tableData.model';

@Component({
  selector: 'lib-order-main',
  templateUrl: './order-main.component.html',
  styleUrls: ['./order-main.component.scss'],
  providers: [provideMomentDateAdapter(Custom_Date_Format)],
})
export class OrderMainComponent implements OnInit, AfterViewInit {
  //#region Đơn hàng
  orderForm!: FormGroup;
  lstOrder: any[] = [];
  showPopAddUpdateOrder = false;
  curOrder!: OROrder;
  //#endregion

  //#region Table
  tableRows: TableRow[] = [];
  tableDisabled: boolean = true;
  //#endregion

  //#region Bộ lọc
  fromDate = new Date();
  toDate = new Date();
  //#endregion

  //#region Khách hàng
  cusSelectOption = [];
  lstCustomers: CUCustomer[] = [
    {
      name: '1123',
      address: '123',
      nickName: '123',
      note: '123',
      phone: '123123',
      recID: '',
    },
    {
      name: '1123',
      address: '123',
      nickName: '123',
      note: '123',
      phone: '123123',
      recID: '',
    },
    {
      name: '1123',
      address: '123',
      nickName: '123',
      note: '123',
      phone: '123123',
      recID: '',
    },
    {
      name: '1123',
      address: '123',
      nickName: '123',
      note: '123',
      phone: '123123',
      recID: '',
    },
    {
      name: '1123',
      address: '123',
      nickName: '123',
      note: '123',
      phone: '123123',
      recID: '',
    },
    {
      name: '1123',
      address: '123',
      nickName: '123',
      note: '123',
      phone: '123123',
      recID: '',
    },
    {
      name: '1123',
      address: '123',
      nickName: '123',
      note: '123',
      phone: '123123',
      recID: '',
    },
    {
      name: '1123',
      address: '123',
      nickName: '123',
      note: '123',
      phone: '123123',
      recID: '',
    },
  ];
  cusPaging = {
    size: 20,
    curPage: 1,
    total: 0,
    request: '',
    isLoading: false,
  };

  //#endregion

  constructor(
    private df: ChangeDetectorRef,
    private orderService: OrderService,
    private customerService: CustomerService,
    private notiService: NotifyService
  ) {}

  ngOnInit(): void {
    this.orderForm = new FormGroup({});
    this.tableRows = [];
  }

  ngAfterViewInit(): void {
    this.loadData();
  }
  addOrder() {
    this.showPopAddUpdateOrder = !this.showPopAddUpdateOrder;
  }

  confirmAddUpdateOrder(data: any) {
    console.log('submit', this.orderForm.value as OROrder);
  }

  denyAddUpdateOrder(data: any) {}

  submitForm() {}

  loadData() {
    this.cusPaging.curPage++;
    this.cusPaging.isLoading = true;
    this.customerService
      .getDataPaging(
        this.cusPaging.curPage,
        this.cusPaging.size,
        this.cusPaging.request
      )
      .subscribe((res: TableData) => {
        this.cusPaging.isLoading = false;
        this.cusPaging.total = res.total;
        this.lstCustomers.push(...res.data);
      });
  }
}
