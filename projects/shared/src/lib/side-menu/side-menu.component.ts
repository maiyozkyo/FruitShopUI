import { Component } from '@angular/core';

@Component({
  selector: 'lib-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css'],
})
export class SideMenuComponent {
  ngOnInit() {}

  clickItem(evt: any) {
    console.log('click', evt);
  }
}
