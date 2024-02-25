import { NgModule } from '@angular/core';
import { OrderComponent } from './order.component';
import { RouterModule, Routes } from '@angular/router';
import { OrderMainComponent } from './order-main/order-main.component';
import { SharedModule } from 'projects/shared/src/public-api';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';

const orderRoutes: Routes = [
  {
    path: '',
    component: OrderMainComponent,
  },
];

@NgModule({
  declarations: [OrderComponent, OrderMainComponent],
  imports: [
    RouterModule.forChild(orderRoutes),
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    SharedModule,
  ],
  exports: [OrderComponent, OrderMainComponent],
})
export class OrderModule {}
