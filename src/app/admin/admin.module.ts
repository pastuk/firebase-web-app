import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';


@NgModule({
  declarations: [
    AdminComponent,
    AdminDashboardComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule {
}
