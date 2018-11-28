import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchedulerRoutingModule } from './scheduler-routing.module';
import { SchedulerComponent } from './components/scheduler/scheduler.component';

@NgModule({
  imports: [
    CommonModule,
    SchedulerRoutingModule
  ],
  declarations: [SchedulerComponent]
})
export class SchedulerModule { }
