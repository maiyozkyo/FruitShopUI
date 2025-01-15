import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/Services/api.service';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private apiService: ApiService) {}

  getDataPaging(
    service: string,
    assembly: string,
    method: string,
    curPage: number,
    pageSize: number,
    request: string,
    lstNotIn?: any[],
    filter?: any
  ): Observable<any> {
    if (!lstNotIn) lstNotIn = [];
    return this.apiService.post(service, assembly, method, [
      curPage,
      pageSize,
      request,
      lstNotIn,
      filter,
    ]);
  }

  post(service: string, assembly: string, method: string, data: any) {
    return this.apiService.post(service, assembly, method, [data]);
  }
}
