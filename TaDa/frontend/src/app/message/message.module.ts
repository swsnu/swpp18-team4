import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageRoutingModule } from './message-routing.module';
import { MessageComponent } from './components/message/message.component';

@NgModule({
  imports: [
    CommonModule,
    MessageRoutingModule
  ],
  declarations: [MessageComponent]
})
export class MessageModule { }
