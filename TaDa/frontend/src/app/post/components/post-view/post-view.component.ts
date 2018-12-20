import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../core/services/post.service';
import { UserService } from '../../../core/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Post } from '../../../core/models/post';
import { User } from '../../../core/models/user';
import { isIterable } from 'rxjs/internal-compatibility';

import {CommentService} from '../../../core/services/comment.service';
import {Comment} from '../../../core/models/comment';

import * as Talk from 'talkjs';
import { TalkService } from 'src/app/core/services/talk.service';

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
  refer_comments: Comment[];
  all_users: User[];
  star_value: number;
  private chatPopup: Talk.Popup;

  constructor(
    private post_service: PostService,
    private user_service: UserService,
    public comment_service: CommentService,
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: ToastrService,
    private talkService: TalkService
  ) { }

  ngOnInit() {
    this.comment_value = '';
    this.star_value = 0;
    this.all_users = [];
    this.refer_comments = [];
    this.id = +this.route.snapshot.paramMap.get('id');
    this.post_service.getPostByPostId(this.id)
      .then( post => this.current_post = post)
      .then( () => this.user_service.getUser(this.current_post.author_id)
        .then( user => {
          this.post_author = user;
          this.preloadChatPopup(user);
          return user;
        }))
      .catch( () => this.router.navigateByUrl('/post/list'));
    this.comment_service.getWriteCommentsByPostId(this.id)
      .then(comments => this.post_comments = comments)
      .then( () => this.getAllUser() );
    this.current_user = this.user_service.getCurrentUser();
  }
  getAllUser() {
    if (isIterable(this.post_comments)) {
      for (const comment of this.post_comments) {
        this.user_service.getUser(comment.author_id)
          .then(user => this.all_users.push(user));
      }
    }
  }
  referOfComment(comment) {
    const refer_comment_list = [];
    for (const refer_comment of this.refer_comments) {
      if (refer_comment.refer_comment_id === comment.id) {
        refer_comment_list.push(refer_comment);
      }
    }
    return refer_comment_list;
  }

  back(): void {
    this.router.navigateByUrl(`/post/list/`);
  }

  ConfirmComment(content, star, refer) {
    if (content === '') {
      this.toastrService.info('내용을 입력해주세요');
      return;
    }
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
    this.star_value = 0;
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
    let updated_comment: string = prompt('댓글 수정', comment.content);
    if (updated_comment != null) {
      updated_comment = updated_comment.trim();
      if (updated_comment === '' || updated_comment === comment.content) {
        this.toastrService.warning('내용을 입력해주세요');
      } else {
        comment.content = updated_comment;
        this.comment_service.updateComment(comment)
          .then( () => this.toastrService.info('수정되었습니다'))
          .then( () =>
            this.comment_service.getWriteCommentsByPostId(this.current_post.id)
            .then(comments => this.post_comments = comments ))
          .catch( () => alert('에러!') );
      }
    }
  }
  deleteComment(comment) {
    this.comment_service.deleteComment(comment)
      .then( () => this.comment_service.getWriteCommentsByPostId(this.id)
        .then(comments => this.post_comments = comments))
      .then( () => this.toastrService.warning('삭제되었습니다'))
      .catch( () => alert('에러!') );
  }
  getAuthorname(comment) {
    if (isIterable(this.all_users)) {
      for (const user of this.all_users) {
        if (comment.author_id === user.id) {
          if (user.user_type === 'EE') {
            return user.nickname;
          } else {
            return user.company_name;
          }
        }
      }
    }
  }
  private async preloadChatPopup(vendor: User) {
    this.chatPopup = await this.talkService.createPopup(vendor, false);
    this.chatPopup.mount({ show: false });
  }

  sendMessage() {
    this.chatPopup.show();
  }

  magam() {
    if (this.current_post.is_magam_user || this.current_post.is_magam_timeout) {
      this.toastrService.warning('이미 마감되었습니다');
    } else {
      this.current_post.is_magam_user = true;
      this.post_service.updatePost(this.current_post)
        .then(() => this.post_service.getPostByPostId(this.id)
          .then(post => this.current_post = post))
      .then( () => this.toastrService.warning('마감되었습니다'));
    }
  }
}
