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

  services = [
    {
      name: 'CUCustomer',
      isBought: false,
    },
    {
      name: 'OROrder',
      isBought: false,
    },
    {
      name: 'ADUser',
      isBought: false,
    },
  ];

  constructor(
    private tenantService: TenantService,
    private notiService: NotifyService,
    private df: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.tenantFG = new FormGroup({
      code: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
    });
    this.curTenant = new Tenant();
  }

  confirmAddTenant() {
    this.curTenant = this.tenantFG.value;
    this.tenantService
      .addUpdateTenant(
        this.curTenant,
        this.services.filter((x) => x.isBought).map((x) => x.name)
      )
      .subscribe((res) => {
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

  onSave(evt: any) {
    console.log('save', evt);
  }
}
