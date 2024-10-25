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
  tableService = 'Customer';
  tableMethod = 'TableCustomers';
  //#endregion

  //#region Customer Detail
  customerForm!: FormGroup;
  customerControls: ControlItem[] = [
    {
      controlName: 'recID',
      title: 'ID khách hàng',
      value: '',
      disabled: true,
    },
    {
      controlName: 'phone',
      title: 'Số điện thoại',
      placeHolder: 'Số điện thoại (dùng để đăng nhập)',
      value: '',
    },
    {
      controlName: 'name',
      title: 'Tên khách hàng',
      value: '',
    },
    {
      controlName: 'nickName',
      title: 'Nick Name',
      value: '',
    },
    {
      controlName: 'address',
      title: 'Địa chỉ',
      value: '',
    },
    {
      controlName: 'note',
      title: 'Ghi chú',
      value: '',
    },
  ];

  curCustomer!: CUCustomer;
  //#endregion

  //#endregion

  constructor(
    private popupService: PopupService,
    private formService: FormService
  ) {}

  ngOnInit() {
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
  }

  ngAfterViewInit() {
    this.popupService.setViewContainerRef(this.popupContainerRef);
  }

  addUpdateCustomer() {
    let phoneControl = this.customerControls.find(
      (x) => x.controlName == 'phone'
    );
    if (phoneControl) {
      phoneControl.disabled = !!this.curCustomer.phone;
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
            console.log('add customer', res);
          }
        });
    }
  }
}
