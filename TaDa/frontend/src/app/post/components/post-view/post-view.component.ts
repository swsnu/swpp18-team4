import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../core/services/post.service';
import { UserService } from '../../../core/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Post } from '../../../core/models/post';
import { User } from '../../../core/models/user';

import {CommentService} from '../../../core/services/comment.service';
import {Comment} from '../../../core/models/comment';

import {MarkerManager} from '@agm/core';
import {GoogleMapsAPIWrapper} from '@agm/core';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrls: ['./post-view.component.css']
})

export class PostViewComponent implements OnInit {
  current_post: Post;
  post_author: User;
  post_comments: Comment[];
  current_user: User;
  id: number;
  comment_value: string;

  constructor(
    private post_service: PostService,
    private user_service: UserService,
    private comment_service: CommentService,
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id');
    this.post_service.getPostByPostId(this.id)
      .then( post => this.current_post = post)
      .then( () => this.user_service.getUser(this.current_post.author_id)
        .then( user => this.post_author = user))
      .catch( () => this.router.navigateByUrl('/post/list'));
    this.comment_service.getWriteCommentsByPostId(this.id)
      .then(comments => this.post_comments = comments);
    this.current_user = this.user_service.getCurrentUser();
  }

  back(): void {
    this.router.navigateByUrl(`/post/list/`);
  }

  ConfirmComment(content, star, refer) {
    const new_comment: Comment = {
      id: -1,
      post_id: this.id,
      refer_comment_id: refer,
      author_id: this.current_user.id,
      star: star,
      content: content,
      register_date: null,
      last_modify_date: null
    };
    this.comment_service.createComment(new_comment)
      .then( () => this.comment_service.getWriteCommentsByPostId(this.id)
        .then(comments => this.post_comments = comments))
      .then( () => this.toastrService.info('등록되었습니다'))
      .catch( () => alert('에러!') );
    this.comment_value = '';
  }
  edit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.router.navigateByUrl(`/post/edit/${id}`);
  }
  delete() {
    this.post_service.deletePost(this.current_post)
      .then( () => this.toastrService.warning('삭제되었습니다'))
      .then(() => this.router.navigateByUrl(`/post/list`))
      .catch( () => alert('에러!') );
  }

  editComment(comment) {
    this.comment_service.getWriteCommentsByPostId(this.id)
      .then(comments => this.post_comments = comments)
      .then( () => this.toastrService.info('수정되었습니다'))
      .catch( () => alert('에러!') );
  }
  deleteComment(comment) {
    this.comment_service.deleteComment(comment)
      .then( () => this.comment_service.getWriteCommentsByPostId(this.id)
        .then(comments => this.post_comments = comments))
      .then( () => this.toastrService.warning('삭제되었습니다'))
      .catch( () => alert('에러!') );
  }


}
