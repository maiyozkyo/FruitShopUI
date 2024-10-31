import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormService } from 'projects/shared/src/lib/form/form.service';
import { ControlItem } from 'projects/shared/src/lib/models/form/control-item.model';
import { TableRow } from 'projects/shared/src/lib/models/table/tableRow.model';
import { PopupService } from 'projects/shared/src/lib/popup/popup.service';
import { CUCustomer } from '../models/customer.model';
import { UserCustomer } from '../models/user-customer.model';
import { CustomerService } from '../customer.service';
import { NotifyService } from 'projects/shared/src/lib/services/notify.service';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'lib-customer-main',
  templateUrl: './customer-main.component.html',
  styleUrls: ['./customer-main.component.scss'],
})
export class CustomerMainComponent implements OnInit, AfterViewInit {
  //#region Init Data

  //#region Root
  @ViewChild('popupContainer', { read: ViewContainerRef, static: true })
  popupContainerRef!: ViewContainerRef;

  //#endregion

  //#region Table
  tableDisabled: boolean = false;
  tableRows: TableRow[] = [];
  tableService = environment.customerService;
  tableMethod = 'TableCustomers';
  tableCustomerData: CUCustomer[] = [];
  //#endregion

  //#region Customer Detail
  customerForm!: FormGroup;
  customerControls: ControlItem[] = [
    {
      controlName: 'phone',
      title: 'Số điện thoại',
      placeHolder: 'Số điện thoại (dùng để đăng nhập)',
      value: '',
      type: 'text',
    },
    {
      controlName: 'name',
      title: 'Tên khách hàng',
      value: '',
      type: 'text',
    },
    {
      controlName: 'nickName',
      title: 'Nick Name',
      value: '',
      type: 'text',
    },
    {
      controlName: 'address',
      title: 'Địa chỉ',
      value: '',
      type: 'text',
    },
    {
      controlName: 'note',
      title: 'Ghi chú',
      value: '',
      type: 'text',
    },
  ];

  curCustomer!: CUCustomer;
  //#endregion

  //#region User Customer
  userCustomer!: UserCustomer;
  userCustomerForm!: FormGroup;
  userControls: ControlItem[] = [
    {
      controlName: 'recID',
      title: 'Số điện thoại',
      value: '',
      type: 'select',
      disabled: false,
      isServer: true,
      labelField: 'phone',
      valueField: 'recID',
      pageInfo: {
        service: environment.userService,
        method: 'TableUsers',
        curPage: 1,
      },
    },
    {
      controlName: 'name',
      title: 'Tên khách hàng',
      value: '',
      mappingWithControl: 'recID',
    },
    {
      controlName: 'phone',
      title: 'Số điện thoại',
      placeHolder: 'Số điện thoại (dùng để đăng nhập)',
      value: '',
      hidden: true,
    },
  ];
  //#endregion

  //#endregion

  constructor(
    private customerService: CustomerService,
    private popupService: PopupService,
    private formService: FormService,
    private notiService: NotifyService
  ) {}

  ngOnInit() {
    //#region Customer
    this.curCustomer = new CUCustomer();
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
        disabled: true,
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

    this.customerForm = this.formService.genFromControls(this.customerControls);
    //#endregion

    //#region User Customer
    this.userCustomerForm = this.formService.genFromControls(this.userControls);
    //#endregion
  }

  ngAfterViewInit() {
    this.popupService.setViewContainerRef(this.popupContainerRef);
  }

  addUserCustomer() {
    this.userCustomer = new UserCustomer();
    let userRecIDControl = this.userControls.find(
      (x) => x.controlName === 'recID'
    );
    if (userRecIDControl && userRecIDControl.pageInfo) {
      userRecIDControl.pageInfo.lstNotIn = this.tableCustomerData.map(
        (x) => x.userRecID
      );
    }
    this.popupService
      .open(
        'Lựa chọn người dùng',
        this.userCustomerForm,
        this.userCustomer,
        undefined,
        this.userControls,
        900,
        400
      )
      .subscribe((res) => {
        if (res.isConfirm) {
          this.userCustomer = res.data as UserCustomer;
          this.curCustomer = new CUCustomer();
          this.curCustomer.name = this.userCustomer.name;
          this.curCustomer.phone = this.userCustomer.phone;
          this.curCustomer.userRecID = this.userCustomer.recID;
          setTimeout(() => {
            this.addUpdateCustomer();
          });
        }
      });
  }

  addUpdateCustomer() {
    let phoneControl = this.customerControls.find(
      (x) => x.controlName == 'phone'
    );
    if (phoneControl) {
      this.popupService
        .open(
          'Chi tiết khách hàng',
          this.customerForm,
          this.curCustomer,
          undefined,
          this.customerControls,
          900,
          400
        )
        .subscribe((res) => {
          if (res.isConfirm) {
            this.curCustomer = res.data as CUCustomer;
            this.customerService
              .addUpdateCustomer(this.curCustomer)
              .subscribe((isSuccess) => {
                if (isSuccess) {
                  let isNew =
                    this.curCustomer.recID == this.customerService.nullRecID;
                  let title =
                    (isNew ? 'Thêm mới' : 'Chỉnh sửa') + ' khách hàng';
                  this.notiService.show(title, 'Thành công', 'success');
                }
              });
          }
        });
    }
  }
}
