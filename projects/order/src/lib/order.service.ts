import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { Order } from './models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly service = 'Order';
  constructor(private apiService: ApiService) {}

  addUpdateOrder(order: Order) {
    return this.apiService.post(this.service, 'AddUpdateAsync', [order]);
  }
}
