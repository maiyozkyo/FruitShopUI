import { NgModule } from '@angular/core';
import { TenantComponent } from './tenant.component';
import { SharedModule } from 'projects/shared/src/public-api';
import { TenantMainComponent } from './tenant-main/tenant-main.component';
import { RouterModule, Routes } from '@angular/router';

const tenantRoutes: Routes = [
  {
    path: '',
    component: TenantMainComponent
  }
]

@NgModule({
  declarations: [
    TenantComponent,
    TenantMainComponent
  ],
  imports: [
    RouterModule.forChild(tenantRoutes),
    SharedModule
  ],
  exports: [
    TenantComponent,
    TenantMainComponent
  ]
})
export class TenantModule { }
