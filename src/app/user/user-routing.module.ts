import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../auth/auth.guard';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { UserPath } from './user-path.enum';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserTaskComponent } from './user-task/user-task.component';
import { UserComponent } from './user.component';
import { ViewOptionComponent } from './view-option/view-option.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    canActivate: [ AuthGuard ],
    canActivateChild: [ AuthGuard ],
    children: [
      {
        path: UserPath.UserDashboard,
        component: UserDashboardComponent
      },
      {
        path: UserPath.UserProfile,
        component: UserProfileComponent
      },
      {
        path: UserPath.UserTasks,
        component: UserTaskComponent
      },
      {
        path: UserPath.ViewOptions,
        component: ViewOptionComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class UserRoutingModule {
}
