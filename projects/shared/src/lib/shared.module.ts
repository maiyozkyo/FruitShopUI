import { NgModule } from '@angular/core';
import { SharedComponent } from './shared.component';
import { HttpClientModule } from '@angular/common/http';
import { NotifyComponent } from './notify/notify.component';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { TableComponent } from './table/table.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';

@NgModule({
  declarations: [SharedComponent, NotifyComponent, TableComponent],
  imports: [
    RouterModule.forChild([]),
    HttpClientModule,
    NgbToastModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    NzTableModule,
    NzDividerModule,
  ],
  exports: [
    SharedComponent,
    NotifyComponent,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    TableComponent,
  ],
})
export class SharedModule {}
