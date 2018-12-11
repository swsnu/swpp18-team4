import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import { TalkService } from 'src/app/core/services/talk.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: User;

  constructor(
    private userService: UserService,
    private talkService: TalkService
  ) { }

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    this.loadChatbox(this.user);
  }

  private async loadChatbox(otherUser: User) {
    const chatbox = await this.talkService.createChatbox(otherUser);
    chatbox.mount(document.getElementById('talkjs-container'));
  }
}
