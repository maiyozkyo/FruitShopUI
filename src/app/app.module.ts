import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { AppComponent } from './app.component';
import { SharedModule } from 'projects/shared/src/public-api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './Guards/auth.guard';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LayoutComponent } from './layout/layout.component';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';

const mainRoutes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () =>
      import('../../projects/auth/src/lib/auth.module').then(
        (m) => m.AuthModule
      ),
  },
  {
    path: 'tenant',
    loadChildren: () =>
      import('../../projects/tenant/src/lib/tenant.module').then(
        (m) => m.TenantModule
      ),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('../../projects/user/src/lib/user.module').then(
        (m) => m.UserModule
      ),
  },
  {
    path: 'order',
    loadChildren: () =>
      import('../../projects/order/src/lib/order.module').then(
        (m) => m.OrderModule
      ),
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: 'auth' },
];

@NgModule({
  declarations: [AppComponent, LayoutComponent, SideMenuComponent],
  imports: [
    RouterModule.forRoot(mainRoutes),
    BrowserModule,
    SharedModule,
    BrowserAnimationsModule,
    MatIconModule,
    NgbModule,
    MatToolbarModule,
    MatMenuModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
