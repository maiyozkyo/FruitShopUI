import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';
import { environment } from 'src/environments/environment.development';
import { BGBackground } from './models/background.model';

@Injectable({
  providedIn: 'root',
})
export class BackgroundService {
  private readonly service = environment.backgroundService;
  constructor(private apiService: ApiService) {}

  saveBGTask(bgTask: BGBackground) {
    return this.apiService.post(
      this.service,
      'BackgroundBusiness',
      'SaveBackgroundTask',
      bgTask
    );
  }
}
