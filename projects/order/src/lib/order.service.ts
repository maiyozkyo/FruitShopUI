import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { OROrder } from './models/order.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private readonly service = environment.orderService;
  constructor(private apiService: ApiService) {}

  addUpdateOrder(order: OROrder) {
    return this.apiService.post(this.service, 'AddUpdateAsync', [order]);
  }
}
