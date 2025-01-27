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
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { provideNzI18n, en_US } from 'ng-zorro-antd/i18n';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoadingInterceptorInterceptor } from './Interceptors/loading-interceptor.interceptor';

registerLocaleData(en);

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
    canActivate: [authGuard],
    canActivateChild: [authGuard],
  },
  {
    path: 'user',
    loadChildren: () =>
      import('../../projects/user/src/lib/user.module').then(
        (m) => m.UserModule
      ),
    canActivate: [authGuard],
    canActivateChild: [authGuard],
  },
  {
    path: 'order',
    loadChildren: () =>
      import('../../projects/order/src/lib/order.module').then(
        (m) => m.OrderModule
      ),
    canActivate: [authGuard],
    canActivateChild: [authGuard],
  },
  {
    path: 'customer',
    loadChildren: () =>
      import('../../projects/customer/src/lib/customer.module').then(
        (m) => m.CustomerModule
      ),
    canActivate: [authGuard],
    canActivateChild: [authGuard],
  },
  {
    path: 'product',
    loadChildren: () =>
      import('../../projects/product/src/lib/product.module').then(
        (m) => m.ProductModule
      ),
    canActivateChild: [authGuard],
  },
  {
    path: 'background',
    loadChildren: () =>
      import('../../projects/background/src/lib/background.module').then(
        (m) => m.BackgroundModule
      ),
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
  providers: [
    provideNzI18n(en_US),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
