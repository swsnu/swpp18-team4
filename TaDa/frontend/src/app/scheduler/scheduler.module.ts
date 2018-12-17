import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SchedulerRoutingModule } from './scheduler-routing.module';
import { SchedulerComponent } from './components/scheduler/scheduler.component';
import { AgmCoreModule } from '@agm/core';
import { NgbModule, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    SchedulerRoutingModule,
    FormsModule,
    NgbModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCYOybP6ZEj4V4tWM8367t_EKIXVHD4ado'
    })
  ],
  declarations: [SchedulerComponent]
})
export class SchedulerModule { }
