import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { UserService } from 'src/app/core/services/user.service';
import { TalkService } from 'src/app/core/services/talk.service';
import { TypeEnum } from 'src/app/core/models/enums/type-enum.enum';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { RegionEnum } from 'src/app/core/models/enums/region-enum.enum';
import { HowToPayEnum } from 'src/app/core/models/enums/how-to-pay-enum.enum';
import { PostService } from 'src/app/core/services/post.service';
import { CommentService } from 'src/app/core/services/comment.service';
import { mock_posts } from 'src/app/shared/mock/mock-post';
import { mock_comments } from 'src/app/shared/mock/mock-comment';
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
  tag_list = null; // user preference tag list
  post_list: Post[] = null; // post list to show
  comment_list: Comment[] = null; // comment list to show


  constructor(
    private userService: UserService,
    private postService: PostService,
    private commentService: CommentService,
    private talkService: TalkService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.userService.getUser(id).then(
      user => {
        this.user = user;
        this.user_name = (user.user_type == TypeEnum.EE ? this.user.nickname : this.user.company_name);
        this.is_employee = (user.user_type == TypeEnum.EE);

        this.getTagList();
        /*this.postService.getPostsByAuthorId(id).then(
          posts => {
            this.post_list = posts;
            if (this.user.user_type == TypeEnum.EE) {
              this.commentService.getWriteCommentsByUserId(id).then(
                comments => this.comment_list = comments
            )} else {
              this.commentService.getReceiveCommentsByUserId(id).then(
                comments => this.comment_list = comments
              )
            }
          })
      },
      error => {
        this.router.navigateByUrl('');
      }*/
    });
    this.post_list = mock_posts;
    this.comment_list = mock_comments;
    //console.log(this.postService.makePostTags(this.post_list[1]));
  }

  isMyPage(): boolean {
    return this.user.id === this.userService.getCurrentUser().id;
  }
  
  /* make user preference tags*/
  getTagList() {
    let tag_list = [];
    /* mock data */
    this.user.employee_region = [];
    this.user.employee_how_to_pay=[];
    this.user.employee_type =null;
    this.user.employee_region.push(RegionEnum.seoulip);
    this.user.employee_region.push(RegionEnum.home);
    this.user.employee_how_to_pay.push(HowToPayEnum.pay_hourly);

    tag_list = this.userService.getUserTagInfo(this.user); 
    this.tag_list = tag_list;
  }

  private async loadChatbox(otherUser: User) {
    const chatbox = await this.talkService.createChatbox(otherUser);
    chatbox.mount(document.getElementById('talkjs-container'));
  }

  gotoEdit() {
    this.router.navigateByUrl('/user/edit');
  }

  sendMessage() {
    console.log('send Message!');
  }

  getPostTitle(postId: number): string {
    let tmp = "";
    /* first examine this component */
    for (const post of this.post_list) {
      if (postId === post.id ) {
        return post.title;
      }
    }
    
    /* if fail, http call inevitably */
    this.postService.getPostByPostId(postId).then(
      res => tmp = res.title
    )
    return tmp;
  }
  
}
