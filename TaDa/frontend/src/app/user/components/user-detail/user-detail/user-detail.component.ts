import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import { TypeEnum } from 'src/app/core/models/enums/type-enum.enum';
import { Router } from '@angular/router';


import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/core/services/post.service';
import { CommentService } from 'src/app/core/services/comment.service';
import { Post } from '../../../../core/models/post';
import { Comment } from '../../../../core/models/comment';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: User;
  user_name: string;
  is_employee: boolean;
  post_list: Post[] = null; // post list to show
  comment_list: Comment[] = null; // comment list to show
  comment_title_list: string[] =[];


  constructor(
    private userService: UserService,
    private postService: PostService,
    private commentService: CommentService,
    private router: Router, 
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id).then(
      user => {
        this.user = user;
        this.user_name = (user.user_type == TypeEnum.EE ? this.user.nickname : this.user.company_name);
        this.is_employee = (user.user_type == TypeEnum.EE);

        /* get post list*/
        this.postService.getPostsByAuthorId(id).then(
          posts => {
            this.post_list = posts;
            /* get comment list */
            if (this.user.user_type == TypeEnum.EE) {
              this.commentService.getWriteCommentsByUserId(id).then(
                comments => { 
                  this.comment_list = comments;
                  this.getCommentTitle();
                })} else {
              this.commentService.getReceiveCommentsByUserId(id).then(
                comments => {
                  this.comment_list = comments;
                  this.getCommentTitle();
                }
              )
            }
          })
      },
      error => {
        this.router.navigateByUrl('');
      }
    );
  }

  isMyPage(): boolean {
    return this.user.id === this.userService.getCurrentUser().id;
  }
  
  getCommentTitle(): void {
    /* first examine this component */
    for (const comment of this.comment_list) {
      this.comment_title_list.push(this.findPostTitle(comment.post_id));
    }
  }

  findPostTitle(id: number): string {
    let str ="";
    for (const post of this.post_list) {
      if (post.id === id) {
        return post.title;
      }
    }
    this.postService.getPostByPostId(id).then(
      res => str = res.title,
      error => str = ""
    )
    return str;
  }
}
