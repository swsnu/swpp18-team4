import { Component, OnInit } from '@angular/core';
import { Post } from '../../../core/models/post';
import { mock_posts, mock_posts_for_scheduler } from '../../../shared/mock/mock-post';
import { ToastrService } from 'ngx-toastr';
import { HowToPayEnum } from 'src/app/core/models/enums/how-to-pay-enum.enum';
import { PostService } from 'src/app/core/services/post.service';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.css']
})
export class SchedulerComponent implements OnInit {
  post_list: Post[];
  center_latitude: number;
  center_longitude: number;
  map_zoom: number;
  start_time: Date;
  end_time: Date;
  time_zone_hm: number[];
  success_timezone: Date[];

  constructor(
    private toastrService: ToastrService,
    private postService: PostService
  ) { }

  ngOnInit() {
    this.post_list = [];
    this.time_zone_hm = [0, 0, 0, 0];
    this.start_time = new Date();
    this.end_time = new Date();

    for (let i = 0; i < 10; i += 1) this.post_list.push(mock_posts_for_scheduler[i]);
    //this.post_list.push(mock_posts[0]);
    //this.post_list.push(mock_posts[1]);
    //this.post_list.push(mock_posts[4]);
    //this.post_list.push(mock_posts[5]);
    this.updateCenterCoord();
  }

  updateCenterCoord() {
    if (this.post_list.length === 0) return;
    let sum_latitude: number = 0;
    let sum_longitude: number = 0;
    let max_x: number = -1234;
    let max_y: number = -1234;
    let min_x: number = 1234;
    let min_y: number = 1234;
    let dist_xy: number = 0;

    for(let i = 0; i < this.post_list.length; i = i + 1) {
      sum_latitude = sum_latitude + this.post_list[i].latitude;
      sum_longitude = sum_longitude + this.post_list[i].longitude;
      if (max_x < this.post_list[i].latitude) {
        max_x = this.post_list[i].latitude;
      }
      if (min_x > this.post_list[i].latitude) {
        min_x = this.post_list[i].latitude;
      }
      if (max_y < this.post_list[i].longitude) {
        max_y = this.post_list[i].longitude;
      }
      if (min_y > this.post_list[i].longitude) {
        min_y = this.post_list[i].longitude;
      }
    }
    dist_xy = max_x - min_x;
    if (dist_xy < max_y - min_y) {
      dist_xy = max_y - min_y;
    }

    this.center_latitude = sum_latitude / this.post_list.length;
    this.center_longitude = sum_longitude / this.post_list.length;
    this.map_zoom = this.makeScale(dist_xy * 111000);  // meter
  }

  makeScale(dist: number): number {
    if(dist < 5) return 16;     // contain only 1 pin
    let magic_number: number = 9 - Math.log2(dist / 50000);
    return Math.ceil(magic_number);
  }

  private getStringFromDate(date: Date): string {
    return (date.getMonth() + 1) + '/' + date.getDate();
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

  private getFitWeight(post: Post): number {
    return 0.5;
  }

  private divideFunction(a, b, c) {
    return a * c + b * (1 - c);
  }

  getWeight(post: Post, money_weight: number) {
    if (this.isIntersect(post, this.start_time, this.end_time)) return 0;
    if (post.how_to_pay != HowToPayEnum.pay_hourly) return 0;
    if (post.is_magam_timeout || post.is_magam_user) return 0;
    return this.divideFunction(post.pay_per_hour / 20000, this.getFitWeight(post), money_weight);
  }

  isIntersect(post: Post, start_time: Date, end_time: Date): boolean {
    if (post.is_same_person) {
      for (let i = 0; i < post.timezone.length; i = i + 2) {
        let st = post.timezone[i];
        let en = post.timezone[i + 1];
        if (start_time.getTime() <= st.getTime() && en.getTime() <= end_time.getTime()) {
          // time fit
        } else {
          return false;
        }
      }
      return true;
    }
    else {
      for (let i = 0; i < post.timezone.length; i = i + 2) {
        let st = post.timezone[i];
        let en = post.timezone[i + 1];
        if (start_time.getTime() <= st.getTime() && en.getTime() <= end_time.getTime()) {
          return true;
        }
      }
      return false;
    }
  }

  goSchedule() {
    let start_time = this.start_time;
    let end_time = this.end_time;
    this.success_timezone = [];
    let result: Post[] = [];
    this.postService.getPosts().then(
      posts => {
        this.post_list = mock_posts_for_scheduler.filter(x => this.isIntersect(x, start_time, end_time));
      },
      err => {
        console.log(err);
      }
    );
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
  
  onClickSearchButton(): void {
    // date time re-bind
    const converted_time_zone_start = this.convertJsonToDate(this.start_time);
    const converted_time_zone_end = this.convertJsonToDate(this.end_time);
    converted_time_zone_start.setHours(this.time_zone_hm[0]); converted_time_zone_start.setMinutes(this.time_zone_hm[1]);
    converted_time_zone_end.setHours(this.time_zone_hm[2]); converted_time_zone_end.setMinutes(this.time_zone_hm[3]);

    if ( isNaN(converted_time_zone_start.getTime()) || isNaN(converted_time_zone_end.getTime()) ) {
      this.toastrService.warning('올바른 날짜 형식이 아닙니다.');
      return;
    } else if ( converted_time_zone_start > converted_time_zone_end ) {
      this.toastrService.warning('종료 시간이 시작 시간보다 빠릅니다.');
      return;
    } else {
      this.start_time = converted_time_zone_start;
      this.end_time = converted_time_zone_end;
    }
    this.goSchedule();

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
