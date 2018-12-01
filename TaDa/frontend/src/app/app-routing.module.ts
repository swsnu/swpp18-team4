import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './core/home/home.component';
import { SigninComponent } from './auth/components/signin/signin.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { AuthGuard } from './core/guard/auth.guard';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const routes: Routes = [
  { path: '', component: HomeComponent},
  { path: 'signin', component: SigninComponent},
  { path: 'signup', component: SignupComponent},
  { path: 'message', canActivate: [AuthGuard], loadChildren: './message/message.module#MessageModule' },
  { path: 'scheduler', canActivate: [AuthGuard], loadChildren: './scheduler/scheduler.module#SchedulerModule' },
  { path: 'user', canActivate: [AuthGuard], loadChildren: './user/user.module#UserModule'},
  { path: 'post', loadChildren: './post/post.module#PostModule' },
  { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    ToastrModule.forRoot()

  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
