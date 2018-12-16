import { Component, OnInit } from '@angular/core';
import { User } from '../../core/models/user';
import { UserService } from '../../core/services/user.service';
import { Router } from '@angular/router';
import { TalkService } from 'src/app/core/services/talk.service';
import { PostService } from '../../core/services/post.service';
import { Post } from '../../core/models/post';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  current_user: User;
  closing_posts: Post[];
  constructor(
    public userService: UserService,
    private talkService: TalkService,
    private router: Router,

    private postService: PostService,
    private modalService: NgbModal
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

  alarm() {
    this.postService.getClosingTimePosts()
      .then( posts => this.closing_posts = posts);
    this.modalService.open(aa, { centered: true });
  }
}
