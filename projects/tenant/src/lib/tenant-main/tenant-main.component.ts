import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TenantService } from '../tenant.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Tenant } from '../models/tenant.model';
import { NotifyService } from 'projects/shared/src/lib/notify.service';

@Component({
  selector: 'lib-tenant-main',
  templateUrl: './tenant-main.component.html',
  styleUrls: ['./tenant-main.component.scss'],
})
export class TenantMainComponent implements OnInit {
  curTenant!: Tenant;
  tenantFG!: FormGroup;
  showPopTenant: boolean = false;
  lstDBTypes = [
    {
      DBName: 'MongoDB',
      Value: 0,
    },
    {
      DBName: 'Postgres',
      Value: 1,
    },
    {
      DBName: 'MsSQL',
      Value: 2,
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
      dbType: new FormControl(-1, [Validators.required]),
    });
    this.curTenant = new Tenant();
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
