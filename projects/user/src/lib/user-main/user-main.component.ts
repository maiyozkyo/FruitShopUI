import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormItem } from 'projects/shared/src/lib/models/formItem.model';
import { TableRow } from 'projects/shared/src/lib/models/tableRow.model';
import { ADUser } from 'projects/shared/src/lib/models/user.model';

@Component({
  selector: 'lib-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.scss'],
})
export class UserMainComponent implements OnInit {
  //#region Table
  tableRows: TableRow[] = [];
  tableDisabled = true;
  showPopAddUser = false;
  //#endregion

  //#region Người dùng
  userFG!: FormGroup;
  userControls!: FormItem[];
  curUser!: ADUser;
  //#endregion

  constructor() {}
  ngOnInit() {
    this.tableRows = [
      {
        field: 'userName',
        title: 'Tên đăng nhập',
      },
      {
        field: 'phone',
        title: 'Số điện thoại',
      },
      {
        field: 'isActived',
        title: 'Đang hoạt động',
        type: 'checkbox',
      },
      {
        field: 'isTrial',
        title: 'Dùng thử',
        type: 'checkbox',
      },
      {
        field: 'isDeleted',
        title: 'Đã xóa',
        type: 'checkbox',
      },
    ];

    this.userControls = [
      {
        controlName: 'userName',
        title: 'Tên đăng nhập',
        value: '',
      },
      {
        controlName: 'phone',
        title: 'Số điện thoại',
        value: '',
      },
      {
        controlName: 'isActived',
        title: 'Đang hoạt động',
        type: 'switch',
        value: true,
      },
      {
        controlName: 'isTrial',
        title: 'Dùng thử',
        type: 'switch',
        value: false,
      },
      {
        controlName: 'isDeleted',
        title: 'Đã xóa',
        type: 'switch',
        value: false,
      },
    ];
    this.userFG = new FormGroup({});
  }

  clickAddUpdateUserPopup() {
    this.showPopAddUser = !this.showPopAddUser;
  }

  confirmAddUpdateUser(user: any) {
    console.log(user);
  }
}
