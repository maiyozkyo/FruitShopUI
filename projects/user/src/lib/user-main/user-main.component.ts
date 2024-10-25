import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TableRow } from 'projects/shared/src/lib/models/table/tableRow.model';
import { ADUser } from 'projects/shared/src/lib/models/user.model';
import { UserService } from '../user.service';
import { NotifyService } from 'projects/shared/src/lib/services/notify.service';
import { TokenService } from 'src/app/Services/token.service';
import { TableComponent } from 'projects/shared/src/lib/table/table.component';
import { ControlItem } from 'projects/shared/src/lib/models/form/control-item.model';

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
  userControls!: ControlItem[];
  curUser!: ADUser;
  @ViewChild('userTable') userTable!: TableComponent;
  //#endregion

  constructor(
    private userService: UserService,
    private notiService: NotifyService,
    private tokenService: TokenService
  ) {}
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
        icon: 'user',
      },
      {
        controlName: 'phone',
        title: 'Số điện thoại',
        value: '',
        icon: 'mobile',
        validators: [Validators.required],
      },
      {
        controlName: 'password',
        title: 'Mật khẩu',
        type: 'password',
        hidden: true,
        value: '',
        icon: 'lock',
        validators: [Validators.required],
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

    if (this.tokenService.isAdmin()) {
      this.tableRows.push({
        field: 'isAdmin',
        title: 'Quản trị viên',
        type: 'checkbox',
      });

      this.userControls.push({
        controlName: 'isAdmin',
        title: 'Quản trị viên',
        type: 'switch',
        value: true,
      });
    }
    this.userFG = new FormGroup({});
  }

  clickAddUpdateUserPopup() {
    this.showPopAddUser = !this.showPopAddUser;
  }

  confirmAddUpdateUser(user: ADUser) {
    this.userService
      .addUpdateUser(user, this.userFG.controls['password'].value)
      .subscribe((res) => {
        if (res) {
          this.notiService.show(
            'Thêm mới/Chỉnh sửa người dùng',
            'Thành công',
            'success'
          );
          this.userTable.reload();
        } else {
          this.notiService.show(
            'Thêm mới/Chỉnh sửa người dùng',
            'Thất bại',
            'error'
          );
        }
      });
  }
}
