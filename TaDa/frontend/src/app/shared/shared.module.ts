import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostModule } from '../post/post.module';
import { UserModule } from '../user/user.module';
import { SchedulerModule } from '../scheduler/scheduler.module';
import { TagComponent } from './tag/tag.component';
import { TimeblockComponent } from './timeblock/timeblock.component';
import { NgbdModalComponent } from './modal/modal.component';
import { DragToSelectModule } from 'ngx-drag-to-select';

@NgModule({
  imports: [
    CommonModule,
    DragToSelectModule.forRoot(),
    /*PostModule,
    UserModule,
    SchedulerModule*/
  ],
  declarations: [
    TagComponent,
    TimeblockComponent,
    NgbdModalComponent
  ],
  exports: [
    TagComponent,
    TimeblockComponent,
    NgbdModalComponent    
  ]
})
export class SharedModule { }