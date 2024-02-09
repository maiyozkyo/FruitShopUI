import { NgModule } from '@angular/core';
import { SharedComponent } from './shared.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuModule } from 'primeng/menu';

@NgModule({
  declarations: [SharedComponent, SideMenuComponent],
  imports: [PanelMenuModule, MenuModule],
  exports: [SharedComponent, SideMenuComponent],
})
export class SharedModule {}
