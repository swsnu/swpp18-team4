import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { PostService } from 'src/app/core/services/post.service';
import { mock_posts } from '../../../shared/mock/mock-post';
import { User } from '../../../core/models/user';
import { Post } from '../../../core/models/post';
import { ArbeitTypeEnum } from '../../../core/models/enums/arbeit-type-enum.enum';
import { HowToPayEnum } from '../../../core/models/enums/how-to-pay-enum.enum';
import { RegionEnum } from '../../../core/models/enums/region-enum.enum';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit {
  posts_all: Post[];
  posts_filtered: Post[];
  filering_tags: string[];
  region_enum_list: string[];
  arbeit_type_enum_list: string[];
  how_to_pay_enum_list: string[];

  /* var for html */
  filter_button: number = 0;

  constructor(
    private userService: UserService,
    private postService: PostService,

  ) { }

  ngOnInit() {
    
    this.posts_all = mock_posts;
    this.posts_filtered = this.posts_all;
    this.filering_tags = ['너', '그리고', '나'];
    this.region_enum_list = Object.values(RegionEnum);
    this.arbeit_type_enum_list = Object.values(ArbeitTypeEnum);
    this.how_to_pay_enum_list = Object.values(HowToPayEnum);

  }

  getAuthorNameByID(id: number): string {
    return "정채현";
  }

  search(keyword: string, criteria: number) {
    console.log(keyword+" "+ criteria);
  }



}




