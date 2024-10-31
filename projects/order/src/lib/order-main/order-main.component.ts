import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Custom_Date_Format } from '../mat-date-format/custom-date-format.model';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { OrderService } from '../order.service';
import { TableRow } from 'projects/shared/src/lib/models/table/tableRow.model';
import { NotifyService } from 'projects/shared/src/lib/services/notify.service';
import { CustomerService } from 'projects/customer/src/public-api';
import { OROrder } from '../models/order.model';
import { CUCustomer } from 'projects/customer/src/lib/models/customer.model';
import { TableData } from 'projects/shared/src/lib/models/table/tableData.model';
import { PopupService } from 'projects/shared/src/lib/popup/popup.service';
import { FormService } from 'projects/shared/src/lib/form/form.service';
import { ControlItem } from 'projects/shared/src/lib/models/form/control-item.model';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'lib-order-main',
  templateUrl: './order-main.component.html',
  styleUrls: ['./order-main.component.scss'],
  providers: [provideMomentDateAdapter(Custom_Date_Format)],
})
export class OrderMainComponent implements OnInit, AfterViewInit {
  //#region Init Data
  //#region Root
  @ViewChild('popupContainer', { read: ViewContainerRef, static: true })
  popupContainerRef!: ViewContainerRef;

  //#endregion

  //#region Đơn hàng
  orderForm!: FormGroup;
  lstOrder: any[] = [];
  showPopAddUpdateOrder = false;
  curOrder!: OROrder;
  orderControls: ControlItem[] = [];

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

  //#endregion

  //#endregion
  constructor(
    private df: ChangeDetectorRef,
    private orderService: OrderService,
    private customerService: CustomerService,
    private notiService: NotifyService,
    private popupService: PopupService,
    private formService: FormService
  ) {}

  ngOnInit(): void {
    //#region Đơn hàng
    this.tableRows = [];
    this.orderControls = [
      {
        controlName: 'customerRecID',
        title: 'Tên đăng nhập',
        value: '',
        icon: 'user',
        type: 'select',
        labelField: 'name',
        valueField: 'recID',
        isServer: true,
        pageInfo: {
          service: environment.customerService,
          method: 'TableCustomers',
          curPage: 1,
        },
      },
    ];
    this.orderForm = this.formService.genFromControls(this.orderControls);
    //#endregion

    //#region Khách hàng

    //#endregion
  }

  ngAfterViewInit(): void {
    this.popupService.setViewContainerRef(this.popupContainerRef);
    this.orderForm = this.formService.genFromControls(this.orderControls);
  }

  addOrder() {
    this.popupService
      .open(
        'Add/Update đơn hàng',
        this.orderForm,
        this.curOrder,
        undefined,
        this.orderControls
      )
      .subscribe((res) => {
        if (res.isConfirm) {
          this.confirmAddUpdateOrder(res.data);
        } else {
          this.cancelAddUpdateOrder();
        }
      });
  }

  confirmAddUpdateOrder(orderData: any) {
    console.log('confirmAddUpdateOrder', orderData);
  }

  cancelAddUpdateOrder() {
    console.log('cancelAddUpdateOrder');
  }

  denyAddUpdateOrder(data: any) {}

  submitForm() {}
}
