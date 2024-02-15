import { NgModule } from '@angular/core';
import { OrderComponent } from './order.component';
import { RouterModule, Routes } from '@angular/router';
import { OrderMainComponent } from './order-main/order-main.component';

const orderRoutes: Routes = [
  {
    path: '',
    component: OrderMainComponent,
  },
];

@NgModule({
  declarations: [OrderComponent],
  imports: [RouterModule.forChild(orderRoutes)],
  exports: [OrderComponent],
})
export class OrderModule {}
