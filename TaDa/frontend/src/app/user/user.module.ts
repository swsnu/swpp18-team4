import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { UserDetailComponent } from './components/user-detail/user-detail/user-detail.component';
import { UserDetailEmployeeComponent } from './components/user-detail/user-detail-employee/user-detail-employee.component';
import { UserDetailEmployerComponent } from './components/user-detail/user-detail-employer/user-detail-employer.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    SharedModule
  ],
  declarations: [
    UserDetailComponent, 
    UserDetailEmployeeComponent, 
    UserDetailEmployerComponent,
  ]
})
export class UserModule { }
