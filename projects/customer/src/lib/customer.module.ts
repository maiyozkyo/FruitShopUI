import { NgModule } from '@angular/core';
import { CustomerComponent } from './customer.component';
import { RouterModule, Routes } from '@angular/router';
import { CustomerMainComponent } from './customer-main/customer-main.component';
import { SharedModule } from 'projects/shared/src/public-api';

const customerRoutes: Routes = [
  {
    path: '',
    component: CustomerMainComponent,
  },
];

@NgModule({
  declarations: [CustomerComponent, CustomerMainComponent],
  imports: [RouterModule.forChild(customerRoutes), SharedModule],
  exports: [CustomerComponent],
})
export class CustomerModule {}
