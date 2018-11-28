import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserDetailComponent } from './components/user-detail/user-detail/user-detail.component';
import { UserEditComponent } from './components/user-edit/user-edit/user-edit.component';

const routes: Routes = [
  { path: 'edit', component: UserEditComponent },
  { path: ':id', component: UserDetailComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
