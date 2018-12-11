import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import { TalkService } from 'src/app/core/services/talk.service';
import { TypeEnum } from 'src/app/core/models/enums/type-enum.enum';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: User;

  constructor(
    private userService: UserService,
    private talkService: TalkService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id).then(
      user => {
        this.user = user;
        if(id != this.userService.getCurrentUser().id) {
          this.loadChatbox(user);
        }
      }
    )
  }

  getCurrentUserName(): string {
    if(!this.user) return '';
    return this.user.user_type === TypeEnum.EE ? this.user.nickname : this.user.company_name;
  }

  private async loadChatbox(otherUser: User) {
    const chatbox = await this.talkService.createChatbox(otherUser);
    chatbox.mount(document.getElementById('talkjs-container'));
  }
}
