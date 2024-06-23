import { Injectable } from '@angular/core';
import { ADUser } from 'projects/shared/src/lib/models/user.model';
import { ApiService } from 'src/app/Services/api.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly service = 'User';
  constructor(private apiService: ApiService) {}

  addUser(user: ADUser) {}
}
