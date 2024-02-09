import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'lib-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css'],
})
export class SideMenuComponent {
  items: MenuItem[] = [];
  ngOnInit() {
    this.items = [
      {
        label: 'Options',
        items: [
          {
            label: 'Update',
            icon: 'pi pi-refresh',
            command: () => {},
          },
          {
            label: 'Delete',
            icon: 'pi pi-times',
            command: () => {},
          },
        ],
      },
      {
        label: 'Navigate',
        items: [
          {
            label: 'Angular',
            icon: 'pi pi-external-link',
            url: 'http://angular.io',
          },
          {
            label: 'Router',
            icon: 'pi pi-upload',
            routerLink: '/fileupload',
          },
        ],
      },
    ];
  }
}
