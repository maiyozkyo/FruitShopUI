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
import { Order } from '../models/order.model';
import { TableRow } from 'projects/shared/src/lib/models/tableRow.model';
import { NotifyService } from 'projects/shared/src/lib/services/notify.service';

@Component({
  selector: 'lib-order-main',
  templateUrl: './order-main.component.html',
  styleUrls: ['./order-main.component.scss'],
  providers: [provideMomentDateAdapter(Custom_Date_Format)],
})
export class OrderMainComponent implements OnInit, AfterViewInit {
  orderForm!: FormGroup;
  lstOrder: any[] = [];
  showPopAddUpdateOrder = false;
  curOrder!: Order;
  tableRows: TableRow[] = [];
  tableDisabled: boolean = true;

  fromDate = new Date();
  toDate = new Date();

  constructor(
    private df: ChangeDetectorRef,
    private orderService: OrderService,
    private notiService: NotifyService
  ) {}

  ngOnInit(): void {
    this.orderForm = new FormGroup({});
    this.tableRows = [];
  }

  ngAfterViewInit(): void {}
  addOrder() {
    this.showPopAddUpdateOrder = !this.showPopAddUpdateOrder;
    console.log(this.fromDate, this.toDate);
  }

  confirmAddUpdateOrder(data: any) {
    console.log('submit', this.orderForm.value as Order);
  }

  denyAddUpdateOrder(data: any) {}

  submitForm() {}
}
