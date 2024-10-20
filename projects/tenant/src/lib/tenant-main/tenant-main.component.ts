import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TenantService } from '../tenant.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Tenant } from '../models/tenant.model';
import { NotifyService } from 'projects/shared/src/lib/services/notify.service';

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
      code: 'CUCustomer',
      isBought: false,
    },
    {
      code: 'OROrder',
      isBought: false,
    },
    {
      code: 'ADUser',
      isBought: false,
    },
    {
      code: 'PRProduct',
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
        this.services.filter((x) => x.isBought).map((x) => x.code)
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

  migrateDatabase() {
    let services = this.services.filter((x) => x.isBought).map((x) => x.code);
    this.tenantService.migrateDB(services).subscribe((res) => {
      if (!res) {
        this.notiService.show(
          'Migrate Database',
          'Thành công',
          'success',
          5000
        );
      } else {
        this.notiService.show('Migrate Database', res, 'error', 5000);
      }
    });
  }
}
