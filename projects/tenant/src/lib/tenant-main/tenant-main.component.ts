import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TenantService } from '../tenant.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Tenant } from '../models/tenant.model';
import { NotifyService } from 'projects/shared/src/lib/notify.service';
import { DataSrc, TableRow } from 'projects/shared/src/lib/models/table.model';

@Component({
  selector: 'lib-tenant-main',
  templateUrl: './tenant-main.component.html',
  styleUrls: ['./tenant-main.component.scss'],
})
export class TenantMainComponent implements OnInit {
  curTenant!: Tenant;
  tenantFG!: FormGroup;
  showPopTenant: boolean = false;
  lstDBTypes: DataSrc[] = [
    {
      label: 'MongoDB',
      value: 0,
    },
    {
      label: 'Postgres',
      value: 1,
    },
    {
      label: 'MsSQL',
      value: 2,
    },
  ];

  tableRows: TableRow[] = [];
  constructor(
    private tenantService: TenantService,
    private notiService: NotifyService,
    private df: ChangeDetectorRef
  ) {}
  ngOnInit() {
    this.tenantFG = new FormGroup({
      code: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      dbType: new FormControl(-1, [Validators.required]),
    });
    this.curTenant = new Tenant();
    this.tableRows = [
      {
        field: 'service',
        title: 'Service',
      },
      {
        field: 'serviceName',
        title: 'Tên module',
      },
      {
        field: 'typeOfDB',
        title: 'Loại db',
        dataSrc: this.lstDBTypes,
        type: 'select',
        placeholder: 'Chọn loại DB'
      },
    ];
  }

  addUpdateTenant() {
    this.showPopTenant = !this.showPopTenant;
  }

  confirmAddUpdateTenant(evt: Tenant) {
    this.tenantService.addUpdateTenant(evt).subscribe((res) => {
      if (res) {
        this.notiService.show(
          'Tenant',
          'Add/Update thành công',
          'success',
          5000
        );
      } else {
        this.notiService.show('Tenant', 'Add/Update thất bại', 'error', 5000);
      }
    });
  }

  denyAddUpdateOrder(evt: Tenant) {}
}
