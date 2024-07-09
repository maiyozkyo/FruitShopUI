import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/Services/api.service';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private readonly service = 'Customer';
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
}
