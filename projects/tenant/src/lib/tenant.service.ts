import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { Tenant } from './models/tenant.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class TenantService {
  private readonly service = environment.tenantService;

  constructor(private apiService: ApiService) {}
  addUpdateTenant(tenant: Tenant, services: any[]) {
    return this.apiService.post(this.service, 'TenantBusiness', 'AddTenants', [
      tenant,
      services,
    ]);
  }

  migrateDB(services: string[], fields?: string[]) {
    return this.apiService.post(
      this.service,
      'TenantBusiness',
      'MigrateDatabase',
      [services, fields]
    );
  }
}
