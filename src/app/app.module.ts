import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SharedModule } from 'projects/shared/src/public-api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './Guards/auth.guard';
import { LayoutComponent } from 'projects/shared/src/lib/layout/layout.component';

const mainRoutes: Routes = [
  { path: '', redirectTo: 'user', pathMatch: 'full' },
  {
    path: 'user',
    loadChildren: () =>
      import('../../projects/user/src/lib/user.module').then(
        (m) => m.UserModule
      ),
  },
  {
    path: 'order',
    component: LayoutComponent,
    loadChildren: () =>
      import('../../projects/order/src/lib/order.module').then(
        (m) => m.OrderModule
      ),
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: 'user' },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SharedModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(mainRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
