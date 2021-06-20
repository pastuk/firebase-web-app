import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthPath } from './auth/auth-path.enum';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: AuthPath.UserLogin
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
