import { NgModule } from '@angular/core';
import { UserComponent } from './user.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { authGuard } from 'src/app/Guards/auth.guard';
import { SharedModule } from 'projects/shared/src/public-api';

const userRoutes: Routes = [
  {
    path: '',
    component: UserProfileComponent,
    canActivate: [authGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
];

@NgModule({
  declarations: [UserComponent, LoginComponent, UserProfileComponent],
  imports: [RouterModule.forChild(userRoutes), SharedModule],
  exports: [UserComponent],
})
export class UserModule {}
