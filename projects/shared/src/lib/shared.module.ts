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
import { PopupComponent } from './popup/popup.component';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzCardModule } from 'ng-zorro-antd/card';
import { FormComponent } from './form/form.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { DatePickerComponent } from './date-picker/date-picker.component';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';

@NgModule({
  declarations: [
    SharedComponent,
    NotifyComponent,
    TableComponent,
    PopupComponent,
    FormComponent,
    DatePickerComponent,
  ],
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
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    NzSwitchModule,
    NzCardModule,
    NzIconModule,
    NzDatePickerModule,
  ],
  exports: [
    SharedComponent,
    NotifyComponent,
    FormsModule,
    NzFormModule,
    ReactiveFormsModule,
    CommonModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatIconModule,
    TableComponent,
    PopupComponent,
    NzInputModule,
    NzSelectModule,
    NzSwitchModule,
    NzCardModule,
    FormComponent,
    NzIconModule,
    DatePickerComponent,
    NzDatePickerModule,
  ],
})
export class SharedModule {}
