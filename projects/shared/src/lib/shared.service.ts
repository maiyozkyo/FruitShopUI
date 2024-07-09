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
    method: string,
    curPage: number,
    pageSize: number,
    request: string
  ): Observable<any> {
    return this.apiService.post(service, method, [curPage, pageSize, request]);
  }
}
