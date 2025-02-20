import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { OROrder } from './models/order.model';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  //#region Order Services
  private readonly orderService = environment.orderService;
  private readonly orderBusiness = environment.orderAssembly;
  //#endregion

  //#region Product Services
  private readonly productService = environment.productService;
  private readonly producBusiness = environment.productAssembly;
  //#endregion
  constructor(private apiService: ApiService) {}

  addUpdateOrder(order: OROrder) {
    return this.apiService.post(
      this.orderService,
      this.orderBusiness,
      'AddUpdateAsync',
      [order]
    );
  }
}
