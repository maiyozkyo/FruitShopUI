import { NgModule } from '@angular/core';
import { SharedComponent } from './shared.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { HttpClientModule } from '@angular/common/http';
import { LayoutComponent } from './layout/layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NotifyComponent } from './notify/notify.component';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    SharedComponent,
    SideMenuComponent,
    LayoutComponent,
    NotifyComponent,
  ],
  imports: [
    HttpClientModule,
    NgbToastModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  exports: [
    SharedComponent,
    SideMenuComponent,
    NotifyComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
})
export class SharedModule {}
