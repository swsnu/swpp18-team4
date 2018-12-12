import { Component, OnInit } from '@angular/core';
import { User } from '../../core/models/user';
import { UserService } from '../../core/services/user.service';
import { Router } from '@angular/router';
import { TalkService } from 'src/app/core/services/talk.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  current_user: User;
  constructor(
    public userService: UserService,
    private talkService: TalkService,
    private router: Router,
  ) { }

  ngOnInit() {
    /* get current user state */
    //this.current_user = this.userService.getCurrentUser();
  }

  logOut() {
    this.userService.signout();
    sessionStorage.removeItem('user');
    this.userService.setLoginUser(null);
    this.router.navigateByUrl('/');
  }

  toUserPage() {
    //const current_id = this.current_user.id;
    this.router.navigateByUrl('user/' + this.userService.getCurrentUser().id);

  }
}
