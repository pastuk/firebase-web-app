import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthPath } from './auth-path.enum';
import { AuthComponent } from './auth.component';
import { AuthGuard } from './auth.guard';
import { SignOutComponent } from './sign-out/sign-out.component';
import { UserLoginComponent } from './user-login/user-login.component';

const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: AuthPath.SignOut,
        canActivate: [ AuthGuard ],
        component: SignOutComponent
      },
      {
        path: AuthPath.UserLogin,
        component: UserLoginComponent
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
export class AuthRoutingModule {
}
