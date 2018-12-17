import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../core/services/post.service';
import { UserService } from '../../../core/services/user.service';
import { Post } from '../../../core/models/post';

import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { RegionEnum } from '../../../core/models/enums/region-enum.enum';
import { ArbeitTypeEnum } from '../../../core/models/enums/arbeit-type-enum.enum';
import { HowToPayEnum } from '../../../core/models/enums/how-to-pay-enum.enum';


@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.css']
})
export class PostEditComponent implements OnInit {
  current_post: Post;
  region_enum_list: string[];
  arbeit_type_enum_list: string[];
  how_to_pay_enum_list: string[];

  time_zone_list: Date[];
  dead_line: Date;
  time_zone_start: Date;
  time_zone_end: Date;
  time_zone_hm: number[];
  constructor(
    private post_service: PostService,
    private user_service: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id');
    this.post_service.getPostByPostId(id)
      .then( post => this.current_post = post)
      .then( () => this.first_setting() )
      .catch( () => this.router.navigateByUrl('/post/list'));
  }
  first_setting(): void {

    this.dead_line = this.current_post.deadline;
    this.time_zone_list = this.current_post.timezone;
    this.region_enum_list = Object.values(RegionEnum);
    this.arbeit_type_enum_list = Object.values(ArbeitTypeEnum);
    this.how_to_pay_enum_list = Object.values(HowToPayEnum);
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
    return converted_date;
  }
  addToTimezone(time_zone_start): void {
    const converted_time_zone_start = this.convertJsonToDate(time_zone_start);
    const converted_time_zone_end = this.convertJsonToDate(time_zone_start);
    converted_time_zone_start.setHours(this.time_zone_hm[0]); converted_time_zone_start.setMinutes(this.time_zone_hm[1]);
    converted_time_zone_end.setHours(this.time_zone_hm[2]); converted_time_zone_end.setMinutes(this.time_zone_hm[3]);

    if ( isNaN(converted_time_zone_start.getTime()) || isNaN(converted_time_zone_end.getTime()) ) {
      this.toastrService.warning('올바른 날짜 형식이 아닙니다.');
    } else if ( converted_time_zone_start > converted_time_zone_end ) {
      this.toastrService.warning('종료 시간이 시작 시간보다 빠릅니다.');
    } else {
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



  edit(): void {
    let error_state = 0;
    const new_post = this.current_post;
    const should_filled = [new_post.title, new_post.region, new_post.arbeit_type, new_post.how_to_pay, new_post.content];
    const id_names = ['title', 'region', 'arbeit_type', 'how_to_pay', 'content'];

    new_post.deadline = this.convertJsonToDate(this.dead_line);
    if ( isNaN(new_post.deadline.getTime()) ) {
      error_state = 1;
      document.getElementById('deadline').setAttribute('style', 'border: 2px solid red; color: red;');
    } else {
      document.getElementById('deadline').setAttribute('style', 'border: ;');
    }

    // for 로 돌리기
    for (const {item, index} of should_filled.map((item, index) => ({ item, index }))) {
      if ( (item === undefined) || (item === null) || (item.trim() === '') ) {
        error_state = 1;
        document.getElementById(id_names[index]).setAttribute('style', 'border: 2px solid red; color: red;');
      } else {
        document.getElementById(id_names[index]).setAttribute('style', 'border: ; color: ;');
      }
    }
    // 마지막 확인
    if ( error_state === 0 ) {
      // 토스트로 바꾸기
      this.current_post.author_id = this.user_service.getCurrentUser().id;
      this.current_post.timezone = this.time_zone_list;
      this.post_service.updatePost(this.current_post)
        .then( () => this.router.navigateByUrl('/post/list'))
        .then( () => this.toastrService.info('수정되었습니다'))
        .catch( () => alert('업데이트 실패'));
    } else {
      this.toastrService.warning('기본 정보란을 모두 작성해주세요');
    }
  }
  back(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.router.navigateByUrl(`/post/view/${id}`);
  }

  iter(num: number): number[] {
    const number_list = [];
    for (let i = 0; i < num; i++) {
      number_list.push(i);
    }
    return number_list;
  }
  iter_minute(num: number): number[] {
    const number_list = [];
    for (let i = 0; i < num; i++) {
      if (i % 5 === 0) {
        number_list.push(i);
      }
    }
    return number_list;
  }

}
