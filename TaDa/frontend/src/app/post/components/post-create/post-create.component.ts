import { Component, OnInit } from '@angular/core';
import { Post } from '../../../core/models/post';
import { ArbeitTypeEnum } from '../../../core/models/enums/arbeit-type-enum.enum';
import { RegionEnum } from '../../../core/models/enums/region-enum.enum';
import { HowToPayEnum } from '../../../core/models/enums/how-to-pay-enum.enum';

import { Router } from '@angular/router';
import { PostService } from '../../../core/services/post.service';
import { UserService } from '../../../core/services/user.service';
import {ToastrService} from 'ngx-toastr';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
  })
  export class PostCreateComponent implements OnInit {
  init_googlemap_zoom: number;
  init_googlemap_latitude: number;
  init_googlemap_longitude: number;

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
    private user_service: UserService,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.init_googlemap_zoom = 15;

    this.new_post = new Post();
    this.new_post.is_same_person = false;
    this.time_zone_list = [];
    this.region_enum_list = Object.values(RegionEnum);
    this.arbeit_type_enum_list = Object.values(ArbeitTypeEnum);
    this.how_to_pay_enum_list = Object.values(HowToPayEnum);
    this.time_zone_start = new Date();
    this.time_zone_end = new Date();
    this.time_zone_hm = [0, 0, 0, 0];
    this.new_post.longitude = 0;
    this.new_post.latitude = 0;
  }

  regionChange(event) {
    if (event === RegionEnum.home) {
      return;
    } else {
      this.init_googlemap_latitude = this.getInitLatitude();
      this.init_googlemap_longitude = this.getInitLongitude();
      this.new_post.latitude = this.init_googlemap_latitude;
      this.new_post.longitude = this.init_googlemap_longitude;
    }
  }

  getInitLatitude() {
    if (this.new_post.region === RegionEnum.snu || this.new_post.region === RegionEnum.extra) {
      return 37.459325;
    } else if (this.new_post.region === RegionEnum.nakdae) {
      return 37.477002;
    } else if (this.new_post.region === RegionEnum.seoulip) {
      return 37.481227;
    } else if (this.new_post.region === RegionEnum.nokdu) {
      return 37.470526;
    } else {
      return 37.459325;
    }
  }

  getInitLongitude() {
    if (this.new_post.region === RegionEnum.snu || this.new_post.region === RegionEnum.extra) {
      return 126.953480;
    } else if (this.new_post.region === RegionEnum.nakdae) {
      return 126.963758;
    } else if (this.new_post.region === RegionEnum.seoulip) {
      return 126.952755;
    } else if (this.new_post.region === RegionEnum.nokdu) {
      return 126.937568;
    } else {
      return 126.953480;
    }
  }

  onClickMapEvent(event) {
    this.new_post.latitude = event.coords.lat;
    this.new_post.longitude = event.coords.lng;
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



  create(): void {
    let error_state = 0;
    const new_post = this.new_post;
    const should_filled = [new_post.title, new_post.region, new_post.arbeit_type, new_post.how_to_pay, new_post.content];
    const id_names = ['title', 'region', 'arbeit_type', 'how_to_pay', 'content'];

    new_post.deadline = this.convertJsonToDate(this.dead_line);
    if ( isNaN(new_post.deadline.getTime()) ) {
      error_state = 1;
      document.getElementById('deadline').setAttribute('style', 'border: 3px solid red; color: red;');
    } else {
      document.getElementById('deadline').setAttribute('style', 'border: ; color: ;');
    }

    // for 로 돌리기
    for (const {item, index} of should_filled.map((item, index) => ({ item, index }))) {
      if ( (item === undefined) || (item === null) || (item.trim() === '') ) {
        error_state = 1;
        document.getElementById(id_names[index]).setAttribute('style', 'border: 3px solid red; color: red;');
      } else {
        document.getElementById(id_names[index]).setAttribute('style', 'border: ; color: ;');
      }
    }
    // 마지막 확인

    if ( error_state === 0 ) {
      // 토스트로 바꾸기
      this.new_post.author_id = this.user_service.getCurrentUser().id;
      this.new_post.timezone = this.time_zone_list;
      this.post_service.createPost(this.new_post)
        .then( () => this.router.navigateByUrl('/post/list'))
        .catch( () => alert('글 작성 실패'));
    } else {
      this.toastrService.warning('기본 정보란을 모두 작성해주세요');
    }
  }
  back(): void {
    this.router.navigateByUrl('/post/list');
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
