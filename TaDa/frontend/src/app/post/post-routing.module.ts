import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostCreateComponent } from './components/post-create/post-create.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostViewComponent } from './components/post-view/post-view.component';
import { AuthGuard } from '../core/guard/auth.guard';

const routes: Routes = [
  { path: 'list', component: PostListComponent },
  { path: 'create', canActivate: [AuthGuard], component: PostCreateComponent },
  { path: 'view/:id', component: PostViewComponent },
  { path: 'edit/:id', canActivate: [AuthGuard], component: PostEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostRoutingModule { }
