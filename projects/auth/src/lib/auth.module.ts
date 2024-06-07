import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { SharedModule } from 'projects/shared/src/lib/shared.module';
import { RouterModule, Routes } from '@angular/router';

const authRoutes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];
@NgModule({
  declarations: [AuthComponent, LoginComponent],
  imports: [RouterModule.forChild(authRoutes), SharedModule],
  exports: [AuthComponent],
})
export class AuthModule {}
