import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { UserEditComponent } from './components/user-edit/user-edit/user-edit.component';
import { UserEditEmployeeComponent } from './components/user-edit/user-edit-employee/user-edit-employee.component';
import { UserEditEmployerComponent } from './components/user-edit/user-edit-employer/user-edit-employer.component';
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
    UserEditComponent, 
    UserEditEmployeeComponent, 
    UserEditEmployerComponent, 
    UserDetailComponent, 
    UserDetailEmployeeComponent, 
    UserDetailEmployerComponent,
  ]
})
export class UserModule { }
