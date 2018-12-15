import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { PostService } from 'src/app/core/services/post.service';
import { mock_posts } from '../../../shared/mock/mock-post';
import { User } from '../../../core/models/user';
import { Post } from '../../../core/models/post';
import { ArbeitTypeEnum } from '../../../core/models/enums/arbeit-type-enum.enum';
import { HowToPayEnum } from '../../../core/models/enums/how-to-pay-enum.enum';
import { RegionEnum } from '../../../core/models/enums/region-enum.enum';
import { region_enum_list, arbeit_type_enum_list, how_to_pay_enum_list } from '../../../core/models/enums/enum-list';
import { TagComponent } from '../../../shared/tag/tag/tag.component';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit {
  posts_all: Post[];
  posts_filtered: Post[];
  filtering_tags = [];

  region_enum_list: string[];
  arbeit_type_enum_list: string[];
  how_to_pay_enum_list: string[];

  /* var for html */
  filter_button: number = 0;

  constructor(
    private userService: UserService,
    private postService: PostService,
    private toastrService: ToastrService

  ) { }

  ngOnInit() {
    
    this.posts_all = mock_posts;
    this.posts_filtered = this.posts_all;
    this.region_enum_list = region_enum_list;
    this.arbeit_type_enum_list = arbeit_type_enum_list;
    this.how_to_pay_enum_list = how_to_pay_enum_list;

  }

  getAuthorNameByID(id: number): string {
    return "정채현";
  }

  search(keyword: string, criteria: number) {
    console.log(keyword+" "+ criteria);
  }
  
  sort(criteria: number) {
    console.log(criteria);
  }


  /* functions for handling tag from filter_list */ 
  addTag(enumtype: number, enumindex: number): void {
    if (this.filtering_tags.length >= 5) {
      this.toastrService.warning('필터링 태그는 5개까지 입력 가능합니다!');
      return;
    }

    let ele = {
      type: enumtype,
      index: enumindex
    }
    this.filtering_tags.push(ele);
  }

  removeTag(type: number, index: number): void {
    for (let i = 0; i < this.filtering_tags.length; i++) {
      if (this.filtering_tags[i].type == type && this.filtering_tags[i].index == index) {
          this.filtering_tags.splice(i, 1);
          break;
      }
    }
  }

  existInArray(type: number, index: number): boolean {
    for (let i = 0; i < this.filtering_tags.length; i++) {
      if (this.filtering_tags[i].type == type && this.filtering_tags[i].index == index) {
          return true;
      }
    }
    return false;
  }
}