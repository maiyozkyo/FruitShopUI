import { NgModule } from '@angular/core';
import { OrderComponent } from './order.component';
import { RouterModule, Routes } from '@angular/router';
import { OrderMainComponent } from './order-main/order-main.component';
import { SharedModule } from 'projects/shared/src/public-api';

const orderRoutes: Routes = [
  {
    path: '',
    component: OrderMainComponent,
  },
];

@NgModule({
  declarations: [OrderComponent, OrderMainComponent],
  imports: [RouterModule.forChild(orderRoutes), SharedModule],
  exports: [OrderComponent, OrderMainComponent],
})
export class OrderModule {}
