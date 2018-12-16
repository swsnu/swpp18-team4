import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostViewComponent } from './components/post-view/post-view.component';
import { PostCreateComponent } from './components/post-create/post-create.component';
import { PostEditComponent } from './components/post-edit/post-edit.component';
import { CommentViewComponent } from './components/comment-view/comment-view.component';
import { FormsModule } from '@angular/forms';
import { NgbModule, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { TagComponent } from '../shared/tag/tag.component';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  imports: [
    CommonModule,
    PostRoutingModule,
    FormsModule,
    NgbModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCYOybP6ZEj4V4tWM8367t_EKIXVHD4ado'
    }),
  ],
  declarations: [PostListComponent, PostViewComponent, PostCreateComponent, PostEditComponent, CommentViewComponent, TagComponent]
})
export class PostModule { }
