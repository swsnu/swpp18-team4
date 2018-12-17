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
import { TimeblockService, DraggableCell } from 'src/app/core/services/timeblock.service';
import { browser } from 'protractor';



@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})

export class PostListComponent implements OnInit {
  posts_all: Post[];
  posts_filtered: Post[] = [];
  filtering_tags = [];
  timeblocks = [];

  /* enum lists for html loop */
  region_enum_list: string[];
  arbeit_type_enum_list: string[];
  how_to_pay_enum_list: string[];

  /* var for html */
  filter_button: number = 0;

  constructor(
    private userService: UserService,
    private postService: PostService,
    private timeblockService: TimeblockService,
    private toastrService: ToastrService

  ) { }

  ngOnInit() {
    this.getAllPosts();
    this.region_enum_list = region_enum_list;
    this.arbeit_type_enum_list = arbeit_type_enum_list;
    this.how_to_pay_enum_list = how_to_pay_enum_list;
    this.timeblocks = this.timeblockService.createCells();
  }

  getAllPosts() {
    this.postService.getPosts().then(
      posts => {
        this.posts_all = posts;
        this.posts_filtered = posts;
      });
  }
  onClickSearch(keyword: string, criteria: number): void {
    let arr = this.search(keyword, criteria, this.posts_all);
    this.posts_filtered = this.filter(arr);
  }

  // current, using mock user
  getMyTagInfo(): void {
    //const user = this.userService.getCurrentUser();
    if (this.userService.isLoggedIn() == false) {
      return;
    }
    const user = mock_users[0];
    user.employee_region.push(RegionEnum.seoulip);
    user.employee_region.push(RegionEnum.home);
    user.employee_how_to_pay.push(HowToPayEnum.pay_hourly);
    this.filtering_tags = this.userService.getUserTagInfo(user);
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

    let tag_arr2 = [], tag_arr3 = [], tag_arr4 =[];
    let new_arr = [];
    let shouldTimeSort: boolean = false;


    if (this.filtering_tags.length === 0) {
      return arr;
    }

    /* classify filtering_tags by its enum type */
    this.filtering_tags.forEach(element => {
      if (element.type === 1) {
        shouldTimeSort = true;
      } else if (element.type === 2) {
        tag_arr2.push(this.arbeit_type_enum_list[element.index]);
      } else if (element.type === 3) {
        tag_arr3.push(this.region_enum_list[element.index]);
      } else {
        tag_arr4.push(this.how_to_pay_enum_list[element.index]);
      }
    });

    /* If there is no tag, includes all */
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

    if (shouldTimeSort) {
      new_arr = this.filter_time(new_arr);
    }
    return new_arr; 
  }  

  filter_time(input_arr: Post[]) {
    let new_arr = [];
    let bool_one;
    let day: number;
    let should_break: boolean;
    let converted_timeblocks = this.timeblockService.convertCellstoDate(this.timeblocks);

    for (const post of input_arr) {
      should_break = false;

      /* should be same person */
      if (post.is_same_person == true) {
        bool_one = false;
        for (let i = 0; i < post.timezone.length; i = i+2) { //loop2
          day = new Date(post.timezone[i]).getDay();
          bool_one = false;
          for (const obj of converted_timeblocks[day]) { // loop1
            if (new Date(post.timezone[i]).getHours() >= obj.start 
                && new Date(post.timezone[i+1]).getHours() < obj.end) {
              bool_one = true;
              break;
            }
          }//loop1
          
          if (bool_one == false) {
            break;
          }
        } //loop2 

        if (bool_one == true) {
          new_arr.push(post);
        }
      /* should not be same person */
      } else {
        for (let i = 0; i < post.timezone.length; i = i+2) {
          day = new Date(post.timezone[i]).getDay();
          for (const obj of converted_timeblocks[day]) {
            if (new Date(post.timezone[i]).getHours() >= obj.start 
                && new Date(post.timezone[i+1]).getHours() < obj.end) {
              new_arr.push(post);
              should_break = true;
              break;
            }
          }
          if (should_break) break;
        }
      } // end of else
    } // end of biggest loop
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
    if (this.filtering_tags.length >= 10) {
      this.toastrService.warning('필터링 태그는 10개까지 입력 가능합니다!');
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

  private getStringFromDate(date: Date): string {
    return date.getMonth() + '/' + date.getDate();
  }

  getGiganString(post: Post): string {
    var start_time = new Date(2100,0,1,0,0);
    var end_time = new Date(1900,0,1,0,0);
    for (let i = 0; i < post.timezone.length; i = i + 2) {
      if (start_time > post.timezone[i]) start_time = post.timezone[i];
      if (end_time < post.timezone[i + 1]) end_time = post.timezone[i + 1];
    }
    if (start_time > end_time) return '-';
    let start_string = this.getStringFromDate(start_time);
    let end_string = this.getStringFromDate(end_time);
    if (start_string === end_string) return start_string;
    else return start_string + '-' + end_string;
  }
}
