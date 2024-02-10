import { Component } from '@angular/core';
import { MegaMenuItem, MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'lib-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css'],
})
export class SideMenuComponent {
  items: MegaMenuItem[] | undefined;
  ngOnInit() {
    this.items = [
      {
        label: 'Videos',
        icon: 'pi pi-fw pi-video',
        items: [
          [
            {
              label: 'Video 1',
              items: [
                { label: 'Video 1.1', command: this.clickItem },
                { label: 'Video 1.2' },
              ],
            },
            {
              label: 'Video 2',
              items: [{ label: 'Video 2.1' }, { label: 'Video 2.2' }],
            },
          ],
          [
            {
              label: 'Video 3',
              items: [{ label: 'Video 3.1' }, { label: 'Video 3.2' }],
            },
            {
              label: 'Video 4',
              items: [{ label: 'Video 4.1' }, { label: 'Video 4.2' }],
            },
          ],
        ],
      },
      {
        label: 'Videos',
        icon: 'pi pi-fw pi-video',
        items: [
          [
            {
              label: 'Video 1',
              items: [{ label: 'Video 1.1' }, { label: 'Video 1.2' }],
            },
            {
              label: 'Video 2',
              items: [{ label: 'Video 2.1' }, { label: 'Video 2.2' }],
            },
          ],
          [
            {
              label: 'Video 3',
              items: [{ label: 'Video 3.1' }, { label: 'Video 3.2' }],
            },
            {
              label: 'Video 4',
              items: [{ label: 'Video 4.1' }, { label: 'Video 4.2' }],
            },
          ],
        ],
      },
    ];
  }

  clickItem(evt: any) {
    console.log('click', evt);
  }
}
