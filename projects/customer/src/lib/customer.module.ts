import { NgModule } from '@angular/core';
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
  declarations: [CustomerMainComponent],
  imports: [RouterModule.forChild(customerRoutes), SharedModule],
})
export class CustomerModule {}
