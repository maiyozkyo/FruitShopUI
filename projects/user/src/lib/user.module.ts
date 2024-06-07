import { NgModule } from '@angular/core';
import { UserComponent } from './user.component';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { authGuard } from 'src/app/Guards/auth.guard';
import { SharedModule } from 'projects/shared/src/public-api';

const userRoutes: Routes = [
  {
    path: '',
    component: UserProfileComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  declarations: [UserComponent, UserProfileComponent],
  imports: [RouterModule.forChild(userRoutes), SharedModule],
  exports: [UserComponent],
})
export class UserModule {}
