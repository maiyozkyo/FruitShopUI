import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { OROrder } from './models/order.model';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { OROrderDetail } from './models/order-detail.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  //#region Order Services
  private readonly orderService = environment.orderService;
  private readonly orderBusiness = environment.orderAssembly;
  private readonly orderDetailBusiness = environment.orderDetailAssembly;
  //#endregion

  constructor(private apiService: ApiService) {}

  //#region Order
  //Null for create order
  getOrder(order: OROrder) {
    return this.apiService.post(
      this.orderService,
      this.orderBusiness,
      'GetOrderAsync',
      [order]
    );
  }

  cancelCreateOrder(orderID: string) {
    return this.apiService.post(
      this.orderService,
      this.orderBusiness,
      'CancleCreateOrderAsync',
      [orderID]
    );
  }

  //#endregion

  //#region Order Detail
  saveOrderDetails(lstDetail: OROrderDetail[], orderID: string) {
    return this.apiService.post(
      this.orderService,
      this.orderDetailBusiness,
      'AddUpdateOrderDetails',
      [lstDetail, orderID]
    );
  }

  getOrderDetails(orderID: string) {
    return this.apiService.post(
      this.orderService,
      this.orderDetailBusiness,
      'GetOrderDetails',
      [orderID]
    );
  }
  //#endregion
}
