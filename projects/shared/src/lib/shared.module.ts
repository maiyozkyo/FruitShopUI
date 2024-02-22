import { NgModule } from '@angular/core';
import { SharedComponent } from './shared.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { HttpClientModule } from '@angular/common/http';
import { LayoutComponent } from './layout/layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotifyComponent } from './notify/notify.component';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    SharedComponent,
    SideMenuComponent,
    LayoutComponent,
    NotifyComponent,
  ],
  imports: [HttpClientModule, BrowserAnimationsModule, NgbToastModule],
  exports: [SharedComponent, SideMenuComponent, NotifyComponent],
})
export class SharedModule {}
