import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/Services/api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private apiService: ApiService) {

  }

  login(phone: string, password: string){
    return this.apiService.post('User', 'LoginAsync', [phone, password])
  }

  register(phone:string, password: string){
    return this.apiService.post('User', 'AddUpdateUserAsync', [phone, password])
  }
}
