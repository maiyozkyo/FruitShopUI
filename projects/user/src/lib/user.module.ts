import { NgModule } from '@angular/core';
import { UserComponent } from './user.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const userRoutes: Routes = [
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
  declarations: [UserComponent, LoginComponent],
  imports: [
    RouterModule.forChild(userRoutes),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  exports: [UserComponent],
})
export class UserModule {}
