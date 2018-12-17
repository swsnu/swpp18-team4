import { Component, OnInit } from '@angular/core';
import { User } from '../../core/models/user';
import { UserService } from '../../core/services/user.service';
import { Router } from '@angular/router';
import { TalkService } from 'src/app/core/services/talk.service';
import { PostService } from '../../core/services/post.service';
import { Post } from '../../core/models/post';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  alarm_posts: Post[];
  search_posts: Post[];
  key_word: string;
  all_posts: Post[];
  constructor(
    public userService: UserService,
    private talkService: TalkService,
    private router: Router,
    private postService: PostService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.postService.getAlarmPosts()
      .then( posts => this.alarm_posts = posts);
    this.postService.getPosts()
      .then( posts => this.all_posts = posts);
  }

  logOut() {
    this.userService.signout();
    sessionStorage.removeItem('user');
    this.userService.setLoginUser(null);
    this.router.navigateByUrl('/');
  }

  toUserPage() {
    this.router.navigateByUrl('user/' + this.userService.getCurrentUser().id);
  }

  alarm(triger) {
    this.modalService.open(triger);
  }
  search_click(triger) {
    const temp_posts = [];
    for (const post of this.all_posts) {
      if (post.title.includes(this.key_word)) {
        temp_posts.push(post);
      }
    }
    this.search_posts = temp_posts;
    this.alarm(triger);
  }
  close() {
    this.modalService.dismissAll();
  }

}
