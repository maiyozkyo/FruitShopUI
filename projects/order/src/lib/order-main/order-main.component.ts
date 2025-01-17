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
import { CommonData } from 'projects/shared/src/lib/models/table/commonData.model';
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
  @ViewChild('orderDetail', { read: TemplateRef, static: true })
  orderDetailTmp!: TemplateRef<any>;
  //#endregion

  //#region Đơn hàng
  orderForm!: FormGroup;
  lstOrder: any[] = [];
  showPopAddUpdateOrder = false;
  curOrder!: OROrder;
  orderControls: ControlItem[] = [];
  eOrderService = environment.orderService;
  eOrderAssembly = environment.orderAssembly;
  orderTableMethod = 'TableOrders';
  //#endregion

  //#region Table
  tableRows: CommonData[] = [];
  tableDisabled: boolean = true;
  //#endregion

  //#region Bộ lọc
  curCustomer!: CUCustomer;
  filter = {
    fromDate: new Date(),
    toDate: new Date(),
    customerRecID: '',
  };
  //#endregion

  //#region Khách hàng
  cusPaging = {
    size: 20,
    curPage: 0,
    total: 0,
    request: '',
    isLoading: false,
    placeHolder: 'Chọn khách hàng',
  };
  lstCustomers: CUCustomer[] = [];
  //#endregion

  //#region Data Save
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
        title: 'Khách hàng',
        value: '123',
        icon: 'user',
        type: 'text',
      },
    ];
    //#endregion

    //#region Khách hàng
    this.loadDataCustomer();
    //#endregion
  }

  ngAfterViewInit(): void {
    this.popupService.setViewContainerRef(this.popupContainerRef);
  }

  addOrder() {
    this.orderControls = [
      {
        controlName: 'customerRecID',
        title: 'Khách hàng',
        value: this.curCustomer.name,
        icon: 'user',
        type: 'text',
        disabled: true,
      },
    ];

    this.orderForm = this.formService.genFromControls(this.orderControls);
    this.popupService
      .open(
        'Add/Update đơn hàng',
        this.orderForm,
        this.curOrder,
        this.orderDetailTmp,
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

  loadDataCustomer() {
    this.cusPaging.curPage++;
    this.cusPaging.isLoading = true;
    this.customerService
      .getDataPaging(
        this.cusPaging.curPage,
        this.cusPaging.size,
        this.cusPaging.request,
        [],
        this.filter
      )
      .subscribe((res: TableData) => {
        this.cusPaging.isLoading = false;
        this.cusPaging.total = res.total;
        this.lstCustomers.push(...res.data);
        if (!this.curCustomer) {
          this.curCustomer = this.lstCustomers[0];
        }
      });
  }

  onSelectCustomer(cus: CUCustomer) {
    this.curCustomer = cus;
  }
}
