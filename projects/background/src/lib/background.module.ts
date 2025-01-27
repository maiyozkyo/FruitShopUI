import { NgModule } from '@angular/core';
import { BackgroundComponent } from './background.component';
import { RouterModule, Routes } from '@angular/router';
import { BackgroundMainComponent } from './background-main/background-main.component';
import { SharedModule } from 'projects/shared/src/public-api';
import { authGuard } from 'src/app/Guards/auth.guard';

const backgroundRoutes: Routes = [
  {
    path: '',
    component: BackgroundMainComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  declarations: [BackgroundComponent, BackgroundMainComponent],
  imports: [RouterModule.forChild(backgroundRoutes), SharedModule],
})
export class BackgroundModule {}
