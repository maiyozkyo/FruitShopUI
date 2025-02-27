import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Custom_Date_Format } from '../mat-date-format/custom-date-format.model';
import { provideMomentDateAdapter } from '@angular/material-moment-adapter';
import { OrderService } from '../order.service';
import { CommonData } from 'projects/shared/src/lib/models/table/commonData.model';
import { NotifyService } from 'projects/shared/src/lib/services/notify.service';
import { CustomerService } from 'projects/customer/src/public-api';
import { OROrder } from '../models/order.model';
import { CUCustomer } from 'projects/customer/src/lib/models/customer.model';
import { TableData } from 'projects/shared/src/lib/models/table/tableData.model';
import { PopupService } from 'projects/shared/src/lib/services/popup.service';
import { FormService } from 'projects/shared/src/lib/form/form.service';
import { ControlItem } from 'projects/shared/src/lib/models/form/control-item.model';
import { environment } from 'src/environments/environment.development';
import { FilterProduct } from 'projects/product/src/lib/models/product.filter.model';
import { PopupOption } from 'projects/shared/src/lib/models/popup/popup-option.model';
import { ListOption } from 'projects/shared/src/lib/models/list/list-option.model';
import { ListComponent } from 'projects/shared/src/lib/list/list.component';
import { OROrderDetail } from '../models/order-detail.model';
import { PRProduct } from 'projects/product/src/lib/models/product.model';

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
  @ViewChild('orderDetailTmp', { read: TemplateRef, static: true })
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
  orderPopupOption: PopupOption = new PopupOption();
  //#endregion

  //#region Chi tiết đơn
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

  //#region Hàng hóa
  productFG!: FormGroup;
  productControls!: ControlItem[];
  productFields!: CommonData[];
  showPopProduct = false;
  lstProdOption: ListOption = new ListOption();
  productFilter: FilterProduct = {
    IsActive: true,
    ProductName: '',
  };
  chosenProducts: any[] = [];
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

    //#region Hàng hóa
    this.productControls = [
      {
        controlName: 'code',
        title: 'Mã hàng hóa',
        value: '',
        validators: [Validators.required],
        disabledOnEdit: true,
      },
      {
        controlName: 'name',
        title: 'Tên hàng hóa',
        value: '',
        validators: [Validators.required],
      },
      {
        controlName: 'price',
        type: 'number',
        title: 'Đơn giá',
        value: 0,
      },
      {
        controlName: 'img',
        title: 'Hình ảnh',
        value: '',
        type: 'upload',
      },
    ];

    this.productFields = [
      {
        field: 'name',
        title: 'Tên hàng hóa',
        type: 'title',
      },
      {
        field: 'img',
        title: '',
        type: 'cover',
      },
      {
        field: 'quantity',
        title: 'Số lượng',
        type: 'number',
        minVal: 0,
        showOnChoose: true,
      },
      {
        field: 'price',
        title: 'Đơn giá',
        type: 'number',
        minVal: 0,
        editOnChoose: true,
      },
      {
        field: 'total',
        title: 'Tổng',
        type: 'number',
        disabled: true,
        showOnChoose: true,
        autoCalculate: true,
        expression: 'item.quantity * item.price',
      },
    ];
    this.productFG = this.formService.genFromControls(this.productControls);
    //#endregion

    //#region Order Detail Popup Option

    this.orderPopupOption.height = 1000;
    this.orderPopupOption.width = 1300;
    //#endregion

    //#region Product List Option
    this.lstProdOption.service = environment.productService;
    this.lstProdOption.assembly = environment.productAssembly;
    this.lstProdOption.method = 'TableProducts';
    this.lstProdOption.isPaging = false;
    this.lstProdOption.showChosenItems = true;
    this.lstProdOption.allowAddEdit = false;
    this.lstProdOption.allowRemove = false;
    this.lstProdOption.footerControls = [
      {
        field: 'quantity',
        title: 'Số lượng',
        type: 'number',
        disabled: true,
      },
      {
        field: 'price',
        title: 'Đơn giá',
        type: 'number',
        disabled: true,
        hidden: true,
      },
      {
        field: 'total',
        title: 'Tổng tiền',
        type: 'number',
        disabled: true,
      },
    ];
    //#endregion
  }

  ngAfterViewInit(): void {
    this.popupService.setViewContainerRef(this.popupContainerRef);
  }

  addOrder() {
    this.curOrder = new OROrder();
    this.orderService
      .getOrder(null, this.curCustomer.recID)
      .subscribe((orderID: any) => {
        this.curOrder.recID = orderID;
        this.orderControls = [
          {
            controlName: 'recID',
            title: '',
            value: orderID,
            icon: 'user',
            type: 'text',
            disabled: true,
            hidden: true,
          },
          {
            controlName: 'customerRecID',
            title: 'Khách hàng',
            value: this.curCustomer.recID,
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
            this.orderPopupOption,
            this.orderDetailTmp,
            this.orderControls
          )
          .subscribe((res) => {
            if (res.isConfirm) {
              this.confirmAddUpdateOrder(res.data);
            } else {
              this.cancelAddUpdateOrder(true);
            }
          });
      });
  }

  confirmAddUpdateOrder(orderData: any) {
    console.log(
      'confirmAddUpdateOrder',
      orderData,
      this.chosenProducts as PRProduct[]
    );
    let lstOrdDetails: OROrderDetail[] = [];
    this.chosenProducts.forEach((prod) => {
      let detail = new OROrderDetail();
      detail.orderRecID = this.curOrder.recID as string;
      detail.productRecID = prod.recID;
      detail.quantity = prod.quantity;
      detail.price = prod.price;
      detail.saleOff = prod.saleOff;
      detail.tare = prod.tare;
      lstOrdDetails.push(detail);
    });
    console.log(lstOrdDetails);
    this.orderService
      .saveOrderDetails(lstOrdDetails, this.curOrder.recID as string)
      .subscribe((res) => {
        this.notiService.show('Đơn hàng', 'Thành công', 'success');
      });
  }

  cancelAddUpdateOrder(isNew = false) {
    if (isNew) {
      this.orderService
        .cancelCreateOrder(this.curOrder.recID as string)
        .subscribe(() => {});
    }
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
          this.onSelectCustomer(this.lstCustomers[0]);
        }
      });
  }

  onSelectCustomer(cus: CUCustomer) {
    this.curCustomer = cus;
    this.filter.customerRecID = this.curCustomer.recID as string;
  }

  onChosenItemsChange(evt: any) {
    this.chosenProducts = evt;
  }
}
