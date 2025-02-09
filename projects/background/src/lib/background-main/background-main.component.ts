import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { CUCustomer } from 'projects/customer/src/lib/models/customer.model';
import { CommonData } from 'projects/shared/src/lib/models/table/commonData.model';
import { environment } from 'src/environments/environment.development';
import { BGBackground } from '../models/background.model';
import { FormGroup, Validators } from '@angular/forms';
import { ControlItem } from 'projects/shared/src/lib/models/form/control-item.model';
import { FormService } from 'projects/shared/src/lib/form/form.service';
import { NotifyService } from 'projects/shared/src/lib/services/notify.service';
import { BackgroundService } from '../background.service';

@Component({
  selector: 'lib-background-main',
  templateUrl: './background-main.component.html',
  styleUrls: ['./background-main.component.css'],
})
export class BackgroundMainComponent implements OnInit {
  //#region Init Data

  //#region Root
  @ViewChild('popupContainer', { read: ViewContainerRef, static: true })
  popupContainerRef!: ViewContainerRef;

  //#endregion

  //#region Table
  tableDisabled: boolean = false;
  tableRows: CommonData[] = [];
  eBackgroundService = environment.backgroundService;
  eBackgroundAssembly = environment.backgroundAssembly;
  tableMethod = 'TableBackgroundTasks';
  tableBGTaskData: BGBackground[] = [];
  //#endregion

  //#region Background Task
  backgroundFG!: FormGroup;
  backgroundControls!: ControlItem[];
  showPopBGTask: boolean = false;
  lstBusiness = [
    { business: 'AuthBusiness' },
    { business: 'BackgroundBusiness' },
    { business: 'CustomerBusiness' },
    { business: 'OrderBusiness' },
    { business: 'OrderDetailBusiness' },
    { business: 'ProductBusiness' },
    { business: 'TenantBusiness' },
    { business: 'UserBusiness' },
  ];
  //#endregion

  //#endregion

  constructor(
    private notiService: NotifyService,
    private formService: FormService,
    private bgService: BackgroundService
  ) {}
  ngOnInit(): void {
    this.tableRows = [
      {
        field: 'business',
        title: 'Business',
      },
      {
        field: 'method',
        title: 'Method',
      },
      {
        field: 'intervalSeconds',
        title: 'IntervalSeconds',
        type: 'number',
      },
      {
        field: 'IsActive',
        title: 'Hoạt động',
        type: 'checkbox',
      },
    ];

    this.backgroundControls = [
      {
        controlName: 'business',
        title: 'Business',
        value: '',
        validators: [Validators.required],
        type: 'select',
        labelField: 'business',
        valueField: 'business',
        dataSrc: this.lstBusiness,
      },
      {
        controlName: 'method',
        title: 'Method',
        value: '',
        validators: [Validators.required],
      },
      {
        controlName: 'intervalSeconds',
        title: 'Thời gian thực hiện',
        type: 'number',
        value: 0,
        validators: [Validators.min(0)],
      },
      {
        controlName: 'isActive',
        title: 'Hoạt động',
        type: 'switch',
        value: true,
      },
    ];

    this.backgroundFG = this.formService.genFromControls(
      this.backgroundControls
    );
  }

  onPopupBGTaskClick() {
    this.showPopBGTask = true;
  }

  confirmSaveBGTask(bgTask: BGBackground) {
    this.bgService.saveBGTask(bgTask).subscribe((res) => {
      if (res) {
        this.notiService.show(
          'Thêm mới/Chỉnh sửa background task',
          'Thành công',
          'success'
        );
      } else {
        this.notiService.show(
          'Thêm mới/Chỉnh sửa background task',
          'Thất bại',
          'error'
        );
      }
    });
  }
}
