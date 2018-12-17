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
import { Post } from '../../../../core/models/post';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: User;
  tag_list = null;
  post_list: Post[] = null;
  comment_list = null;
  tag_per_post = [];

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
        this.getTagList();
        /*this.postService.getPostsByAuthorId(id).then(
          posts => {
            this.post_list = posts;
            this.commentService.getWriteCommentsByUserId(id).then(
              comments => this.comment_list = comments
            )
          })

          let 
          
          */
      },
      error => {
        this.router.navigateByUrl('');
      }
    );
    this.post_list = mock_posts;
    //console.log(this.postService.makePostTags(this.post_list[1]));
  }

  isMyPage(): boolean {
    return this.user.id === this.userService.getCurrentUser().id;
  }
  
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

  getCurrentUserName(): string {
    if (!this.user) {
      return '';
    }
    return this.user.user_type === TypeEnum.EE ? this.user.nickname : this.user.company_name;
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

  
}
