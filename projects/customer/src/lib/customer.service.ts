import { CUCustomer } from './models/customer.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/Services/api.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private readonly service = 'Customer';
  readonly nullRecID = '00000000-0000-0000-0000-000000000000';
  constructor(private apiService: ApiService) {}

  getDataPaging(
    curPage: number,
    pageSize: number,
    request: string
  ): Observable<any> {
    return this.apiService.post(this.service, 'TableCustomers', [
      curPage,
      pageSize,
      request,
    ]);
  }

  addUpdateCustomer(customer: CUCustomer) {
    return this.apiService.post(this.service, 'AddUpdateCustomer', [customer]);
  }
}
