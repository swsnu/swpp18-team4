import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../core/services/post.service';
import { UserService } from '../../../core/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Post } from '../../../core/models/post';
import { User } from '../../../core/models/user';

import {CommentService} from '../../../core/services/comment.service';
import {Comment} from '../../../core/models/comment';



@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})

export class PostViewComponent implements OnInit {
  current_post: Post;
  post_author: User;

  constructor(
    private post_service: PostService,
    private user_service: UserService,
    private comment_service: CommentService,
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.post_service.getPostByPostId(id)
      .then( post => this.current_post = post)
      .then( () => this.user_service.getUser(this.current_post.author_id)
        .then( user => this.post_author = user))
      .catch( () => this.router.navigateByUrl('/post/list'));
    this.current_user = this.user_service.getCurrentUser();
  }

  back(): void {
    this.router.navigateByUrl(`/post/list/`);
  }
  edit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.router.navigateByUrl(`/post/edit/${id}`);
  }
  edit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.router.navigateByUrl(`/post/edit/${id}`);
  }
  ConfirmComment() {
    const mock_comment: Comment = {
      id: -1,
      post_id: 49,
      refer_comment_id: -1,
      author_id: null,
      star: 1,
      content: 'content3',
      register_date: null,
      last_modify_date: null
    };

    this.comment_service.createComment(mock_comment)
      .then( comment => console.log(comment) )
      .catch( () => console.log('에러!') );
  }
  getComment() {
    this.comment_service.getComment(1)
      .then( comment => console.log(comment))
      .catch( () => console.log('에러2!') );
  }
}
