import { NgModule } from '@angular/core';
import { SharedComponent } from './shared.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { PanelMenuModule } from 'primeng/panelmenu';
import { MenuModule } from 'primeng/menu';
import { MenubarModule } from 'primeng/menubar';
import { MegaMenuModule } from 'primeng/megamenu';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [SharedComponent, SideMenuComponent],
  imports: [
    PanelMenuModule,
    MenuModule,
    MenubarModule,
    MegaMenuModule,
    HttpClientModule,
  ],
  exports: [SharedComponent, SideMenuComponent],
})
export class SharedModule {}
