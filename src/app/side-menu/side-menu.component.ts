import { Component } from '@angular/core';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css'],
})
export class SideMenuComponent {
  isLogin: boolean = false;
  constructor(protected authService: AuthService) {}
  ngOnInit() {}
  clickItem(evt: any) {
    console.log('click', evt);
  }
}
