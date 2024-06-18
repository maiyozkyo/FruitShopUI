import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { Tenant } from './models/tenant.model';

@Injectable({
  providedIn: 'root'
})
export class TenantService {
  private readonly service = 'Tenant';

  constructor(private apiService: ApiService) {

   }
   addUpdateTenant(tenant: Tenant){
    return this.apiService.post(this.service, 'addUpdateTenant', [tenant]);
   }
}                                                                                                             
