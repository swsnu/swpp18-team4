import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { PostService } from 'src/app/core/services/post.service';
import { mock_posts } from '../../../shared/mock/mock-post';
import { mock_users } from '../../../shared/mock/mock-user';
import { User } from '../../../core/models/user';
import { Post } from '../../../core/models/post';
import { ArbeitTypeEnum } from '../../../core/models/enums/arbeit-type-enum.enum';
import { HowToPayEnum } from '../../../core/models/enums/how-to-pay-enum.enum';
import { RegionEnum } from '../../../core/models/enums/region-enum.enum';
import { region_enum_list, arbeit_type_enum_list, how_to_pay_enum_list } from '../../../core/models/enums/enum-list';
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


  /* enum lists for html loop */
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
    //this.getAllPosts();
    this.posts_all = mock_posts;
    this.posts_filtered = this.posts_all; // async 조심
    this.region_enum_list = region_enum_list;
    this.arbeit_type_enum_list = arbeit_type_enum_list;
    this.how_to_pay_enum_list = how_to_pay_enum_list;

  }

  getAllPosts() {
    this.postService.getPosts().then(
      posts => this.posts_all = posts
    );
  }

  getAuthorNameByID(id: number): string {
    return "정채현";
  }


  onClickSearch(keyword: string, criteria: number): void {
    let arr = this.search(keyword, criteria, this.posts_all);
    this.posts_filtered = this.filter(arr);
  }

  getMyTagInfo(): void {
    //const user = this.userService.getCurrentUser();

    const user = mock_users[0];
    user.employee_region.push(RegionEnum.seoulip);
    user.employee_region.push(RegionEnum.home);
    user.employee_how_to_pay.push(HowToPayEnum.pay_hourly);
    let arr = [], user_enums = [];

    user_enums = Object.values(user.employee_type);
    arbeit_type_enum_list.forEach(ele=> {
      if(user_enums.includes(ele)) {
        arr.push({
          type: 2,
          index: arbeit_type_enum_list.indexOf(ele)
        });
      }
  });

    user_enums = Object.values(user.employee_region);
    region_enum_list.forEach(ele=> {
      if(user_enums.includes(ele)) {
        arr.push({
          type: 3,
          index: region_enum_list.indexOf(ele)
        });
      }
    });
    user_enums = Object.values(user.employee_how_to_pay);
    how_to_pay_enum_list.forEach(ele=> {

      if(user_enums.includes(ele)) {
        arr.push({
          type: 4,
          index: how_to_pay_enum_list.indexOf(ele)
        });
      }
    });
    this.filtering_tags = arr;
  }

  search(keyword: string, criteria: number, arr: Post[]): Post[] {
    if (keyword == undefined || (keyword = keyword.trim()) == null) {
      return arr;
    }
    /* search by title */
     let new_arr = [];
    if (criteria === 0) {
      for (const post of arr) {
        if (post.title.includes(keyword)) {
          new_arr.push(post);
        }
      }
    /* search by content */
    } else if (criteria === 1) {
      for (const post of arr) {
        if (post.content.includes(keyword)) {
          new_arr.push(post);
        }
      }
    /* search by title+content */
    } else {
      for (const post of arr) {
        if (post.content.includes(keyword) || post.title.includes(keyword)) {
          new_arr.push(post);
        }
      }
    }
    return new_arr;
  }

  filter(arr: Post[]): Post[] {
    let tag_arr2 = [], tag_arr3 = [], tag_arr4 = [];
    const new_arr = [];

    if (this.filtering_tags.length === 0) {
      return arr;
    }

    /* classify filtering_tags by its enum type */
    this.filtering_tags.forEach(element => {
      if (element.type === 2) {
        tag_arr2.push(this.arbeit_type_enum_list[element.index]);
      } else if (element.type === 3) {
        tag_arr3.push(this.region_enum_list[element.index]);
      } else {
        tag_arr4.push(this.how_to_pay_enum_list[element.index]);
      }
    });

    if (tag_arr2.length === 0) {
      tag_arr2 = this.arbeit_type_enum_list;
    }
    if (tag_arr3.length === 0) {
      tag_arr3 = this.region_enum_list;
    }
    if (tag_arr4.length === 0) {
      tag_arr4 = this.how_to_pay_enum_list;
    }

    for (const post of arr) {
      if ((tag_arr2.includes(post.arbeit_type)) &&
        (tag_arr3.includes(post.region)) &&
        (tag_arr4.includes(post.how_to_pay)))
        new_arr.push(post);
    }
    return new_arr;
  }
  sort(criteria: number) {
    /* sort by register date */
    if (criteria === 0) {
      this.posts_filtered.sort(function(a, b) {
        return a.register_date < b.register_date ? 1 :
               a.register_date > b.register_date ? -1 : 0;
      });

    /* sort by pay */  
    } else if (criteria === 1) { 
      this.posts_filtered.sort(function(a, b) {
      if (a.how_to_pay === HowToPayEnum.pay_hourly && b.how_to_pay === HowToPayEnum.pay_hourly) {
        return a.pay_per_hour < b.pay_per_hour ? 1 :
               a.pay_per_hour > b.pay_per_hour ? -1 : 0;
      } else if (a.how_to_pay !== HowToPayEnum.pay_hourly && b.how_to_pay === HowToPayEnum.pay_hourly) {
        return 1;
      } else if (a.how_to_pay === HowToPayEnum.pay_hourly && b.how_to_pay !== HowToPayEnum.pay_hourly) {
        return -1;
      } else {
        return a.register_date < b.register_date ? 1 :
               a.register_date > b.register_date ? -1 : 0;
      }
      });

    /* sort by deadline date  */
    } else {
      this.posts_filtered.sort(function(a, b) {
        if (a.is_magam_timeout || a.is_magam_user) {
          return 1;
        } else if (b.is_magam_timeout || b.is_magam_user) {
          return -1;
        } else {
          return a.deadline > b.deadline ? 1 :
            a.deadline < b.deadline ? -1 : 0;
        }
      });
    }
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
      if (this.filtering_tags[i].type === type && this.filtering_tags[i].index === index) {
          this.filtering_tags.splice(i, 1);
          break;
      }
    }
  }

  existInArray(type: number, index: number): boolean {
    for (let i = 0; i < this.filtering_tags.length; i++) {
      if (this.filtering_tags[i].type === type && this.filtering_tags[i].index === index) {
          return true;
      }
    }
    return false;
  }
}
