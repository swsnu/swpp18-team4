import { Component, OnInit } from '@angular/core';
import { TalkService } from 'src/app/core/services/talk.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  constructor(
    private talkService: TalkService
  ) { }

  ngOnInit() {
    this.createInbox();
  }

  private async createInbox() {
    const inbox = await this.talkService.createInbox();
    inbox.mount(document.getElementById('talkjs-container'));
      
    this.talkService.destroyAllLoadedPopups();
  }

}
