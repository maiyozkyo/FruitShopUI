import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  constructor(private apiService: ApiService) {}

  getDataPaging(service: string, method: string, curPage: number, pageSize: number, request: string){
    return this.apiService.post(service, method, [curPage, pageSize, request])
  }
}
