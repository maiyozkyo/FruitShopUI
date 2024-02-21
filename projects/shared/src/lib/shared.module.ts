import { NgModule } from '@angular/core';
import { SharedComponent } from './shared.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { HttpClientModule } from '@angular/common/http';
import { LayoutComponent } from './layout/layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [SharedComponent, SideMenuComponent, LayoutComponent],
  imports: [HttpClientModule, BrowserAnimationsModule, MatSlideToggleModule],
  exports: [SharedComponent, SideMenuComponent],
})
export class SharedModule {}
