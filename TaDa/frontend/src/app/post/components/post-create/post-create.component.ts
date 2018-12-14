import { Component, OnInit } from '@angular/core';
import { Post } from '../../../core/models/post';
import { ArbeitTypeEnum } from '../../../core/models/enums/arbeit-type-enum.enum';
import { RegionEnum } from '../../../core/models/enums/region-enum.enum';
import { HowToPayEnum } from '../../../core/models/enums/how-to-pay-enum.enum';

import { Router } from '@angular/router';
import { PostService } from '../../../core/services/post.service';
import { UserService } from '../../../core/services/user.service';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
  })
  export class PostCreateComponent implements OnInit {

  new_post: Post;
  region_enum_list: string[];
  arbeit_type_enum_list: string[];
  how_to_pay_enum_list: string[];

  time_zone_list: Date[];
  dead_line: Date;
  time_zone_start: Date;
  time_zone_end: Date;
  time_zone_hm: number[];

  constructor(
    private router: Router,
    private post_service: PostService,
    private user_service: UserService
  ) { }

  ngOnInit() {
    this.new_post = new Post();
    this.new_post.is_same_person = false;
    this.time_zone_list = [];
    this.region_enum_list = Object.values(RegionEnum);
    this.arbeit_type_enum_list = Object.values(ArbeitTypeEnum);
    this.how_to_pay_enum_list = Object.values(HowToPayEnum);
    this.new_post.author_id = this.user_service.getCurrentUser().id;
    this.time_zone_start = new Date();
    this.time_zone_end = new Date();
    this.time_zone_hm = [0, 0, 0, 0];
  }

  convertJsonToDate(input_json): Date {
    if ( input_json === null || input_json === undefined ) {
      return new Date('');
    }
    const object_to_json = JSON.stringify(input_json);
    const json_to_date = JSON.parse(object_to_json);
    const converted_date = new Date(json_to_date.year, json_to_date.month - 1, json_to_date.day, 23, 59);
    console.log(converted_date);
    return converted_date;
  }
  addToTimezone(time_zone_start, time_zone_end): void {
    const converted_time_zone_start = this.convertJsonToDate(time_zone_start);
    const converted_time_zone_end = this.convertJsonToDate(time_zone_end);
    converted_time_zone_start.setHours(this.time_zone_hm[0]); converted_time_zone_start.setMinutes(this.time_zone_hm[1]);
    converted_time_zone_end.setHours(this.time_zone_hm[2]); converted_time_zone_end.setMinutes(this.time_zone_hm[3]);

    if ( isNaN(converted_time_zone_start.getTime()) || isNaN(converted_time_zone_end.getTime()) ) {
      alert('Invalid Timezone');
    } else if ( converted_time_zone_start > converted_time_zone_end ) {
      alert('종료 시간이 시작 시간보다 빠릅니다.');
    } else {
      alert('yes');
      // store
      this.time_zone_list.push(converted_time_zone_start);
      this.time_zone_list.push(converted_time_zone_end);
      // clear
      this.time_zone_start = null;
      this.time_zone_end = null;
      this.time_zone_hm = [0, 0, 0, 0];
    }
  }
  remove_row(index): void {
    this.time_zone_list.splice(index, 2);
  }



  create(): void {
    let error_state = 0;
    const new_post = this.new_post;
    const should_filled = [new_post.title, new_post.region, new_post.arbeit_type, new_post.how_to_pay, new_post.content];
    const id_names = ['title', 'region', 'arbeit_type', 'how_to_pay', 'content'];

    new_post.deadline = this.convertJsonToDate(this.dead_line);
    if ( isNaN(new_post.deadline.getTime()) ) {
      error_state = 1;
      document.getElementById('deadline').setAttribute('style', 'border: 2px solid red;');
    } else {
      document.getElementById('deadline').setAttribute('style', 'border: 1px solid blue;');
    }

    // for 로 돌리기
    for (const {item, index} of should_filled.map((item, index) => ({ item, index }))) {
      if ( (item === undefined) || (item === null) || (item.trim() === '') ) {
        error_state = 1;
        document.getElementById(id_names[index]).setAttribute('style', 'border: 2px solid red;');
      } else {
        document.getElementById(id_names[index]).setAttribute('style', 'border: 1px solid blue;');
      }
    }

    // 마지막 확인
    if ( error_state === 0 ) {
      // 토스트로 바꾸기
      alert('작성 완료!');
      this.new_post.author_id = this.user_service.getCurrentUser().id;
      this.new_post.timezone = this.time_zone_list;
      this.post_service.createPost(this.new_post)
        .then( () => console.log(1));
    } else {
      alert('* 표시된 칸을 모두 작성해주세요');
    }
  }
  back(): void {
    this.router.navigateByUrl('/post/list');
  }
  typechecker(input): void {
    console.log(typeof input);
    this.post_service.getPosts().then(data => console.log(data));
  }
  iter(num: number): number[] {
    const number_list = [];
    for (let i = 0; i < num; i++) {
      number_list.push(i);
    }
    return number_list;
  }
}
