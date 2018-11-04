import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArbeitPostCreateComponent } from './arbeit-post-create/arbeit-post-create.component';
import { ArbeitPostEditComponent } from './arbeit-post-edit/arbeit-post-edit.component';
import { MainComponent } from './main/main.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpMainComponent } from './sign-up-main/sign-up-main.component';
import { SignUpEmployeeComponent } from './sign-up-employee/sign-up-employee.component';
import { SignUpEmployerComponent } from './sign-up-employer/sign-up-employer.component';
import { ArbeitMainComponent } from './arbeit-main/arbeit-main.component';
import { ArbeitBulletinComponent } from './arbeit-bulletin/arbeit-bulletin.component';
import { ArbeitPostDetailComponent } from './arbeit-post-detail/arbeit-post-detail.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'sign_in', component: SignInComponent },
  { path: 'sign_up', component: SignUpMainComponent },
  { path: 'sign_up/employee', component: SignUpEmployeeComponent },
  { path: 'sign_up/employer', component: SignUpEmployerComponent },
  {
    path: 'arbeit', component: ArbeitMainComponent,
    children: [
      {path: '', component: ArbeitBulletinComponent},
      {path: 'create', component: ArbeitPostCreateComponent},
      {path: ':id', component: ArbeitPostDetailComponent},
      {path: ':id/edit', component: ArbeitPostEditComponent}
    ]
  },
  { path: '**', redirectTo: ''},
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
