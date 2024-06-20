import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Custom_Date_Format } from '../mat-date-format/custom-date-format.model';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { OrderService } from '../order.service';
import { Order } from '../models/order.model';
import { TableRow } from 'projects/shared/src/lib/models/table.model';

@Component({
  selector: 'lib-order-main',
  templateUrl: './order-main.component.html',
  styleUrls: ['./order-main.component.scss'],
  providers: [provideMomentDateAdapter(Custom_Date_Format)],
})
export class OrderMainComponent implements OnInit, AfterViewInit {
  range!: FormGroup;
  orderForm!: FormGroup;
  lstOrder: any[] = [];
  showPopAddUpdateOrder = false;
  curOrder!: Order;
  tableRows: TableRow[] = [];
  tableDisabled: boolean = false;

  constructor(
    private df: ChangeDetectorRef,
    private orderService: OrderService
  ) {}
  ngOnInit(): void {
    this.range = new FormGroup({
      start: new FormControl<Date | null>(null),
      end: new FormControl<Date | null>(null),
    });

    this.orderForm = new FormGroup({
      customerRecID: new FormControl('', [Validators.required]),
    });

    this.tableRows = [
      { field: 'make', title: 'Tên' },
      {
        field: 'model',
        title: 'Seri',
      },
      {
        field: 'price',
        title: 'Giá',
        type: 'number',
      },
      {
        field: 'editable',
        type: 'checkbox',
        title: 'Chỉnh sửa',
      },
    ];
    this.lstOrder = [
      { make: 'Tesla', model: 'Model Y', price: 64950, editable: true },
      { make: 'Ford', model: 'F-Series', price: 33850, editable: false },
      { make: 'Toyota', model: 'Corolla', price: 29600, editable: false },
      { make: 'Mercedes', model: 'EQA', price: 48890, editable: true },
      { make: 'Fiat', model: '500', price: 15774, editable: false },
      { make: 'Nissan', model: 'Juke', price: 20675, editable: false },
      { make: 'Nissan', model: 'Juke', price: 20675, editable: false },
      { make: 'Nissan', model: 'Juke', price: 20675, editable: false },
      { make: 'Nissan', model: 'Juke', price: 20675, editable: false },
    ];
  }

  ngAfterViewInit(): void {}
  addOrder() {
    this.showPopAddUpdateOrder = !this.showPopAddUpdateOrder;
  }

  confirmAddUpdateOrder(data: any) {
    console.log('submit', this.orderForm.value as Order);
  }

  denyAddUpdateOrder(data: any) {}

  submitForm() {}
}
