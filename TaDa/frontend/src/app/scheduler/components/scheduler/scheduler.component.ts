import { Component, OnInit } from '@angular/core';
import { Post } from '../../../core/models/post';
import { mock_posts, mock_posts_for_scheduler } from '../../../shared/mock/mock-post';
import { ToastrService } from 'ngx-toastr';
import { HowToPayEnum } from 'src/app/core/models/enums/how-to-pay-enum.enum';
import { PostService } from 'src/app/core/services/post.service';
import { schResult } from '../../../core/models/schclass';

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
  view_result: schResult[];

  expected_gain: number;

  constructor(
    private toastrService: ToastrService,
    private postService: PostService
  ) { }

  ngOnInit() {
    this.post_list = [];
    this.time_zone_hm = [0, 0, 0, 0];
    this.start_time = new Date();
    this.end_time = new Date();
    this.expected_gain = 0;

    // for (let i = 0; i < 10; i += 1) this.post_list.push(mock_posts_for_scheduler[i]);
    // this.post_list.push(mock_posts[0]);
    // this.post_list.push(mock_posts[1]);
    // this.post_list.push(mock_posts[4]);
    // this.post_list.push(mock_posts[5]);
    this.updateCenterCoord();
  }

  updateCenterCoord() {
    if (this.post_list.length === 0) {
      this.map_zoom = 16;
      this.center_latitude = 37.459123;
      this.center_longitude = 126.953475;
      return;
    }
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

  getWeight(post: Post, money_weight: number) {
    if (!this.isIntersect(post, this.start_time, this.end_time)) return 0;
    if (post.how_to_pay != HowToPayEnum.pay_hourly) return 0;
    if (post.is_magam_timeout || post.is_magam_user) return 0;
    return this.divideFunction(post.pay_per_hour / 20000, this.getFitWeight(post), money_weight);
  }

  isIntersectBetweenSegment(s1, e1, s2, e2) : boolean {
    if (e1 < s2) return false;
    if (s1 > e2) return false;
    return true;
  }

  isIntersectWithSuccess(post: Post, start_time: Date, end_time: Date): Date[] {
    if (post.is_same_person) {
      for (let i = 0; i < post.timezone.length; i = i + 2) {
        let st = post.timezone[i];
        let en = post.timezone[i + 1];
        let ok = 1;
        if (start_time.getTime() <= st.getTime() && en.getTime() <= end_time.getTime()) {
          ok = 1;
          for (let j = 0; j < this.view_result.length; j = j + 1) {
            let st2 = this.view_result[j].start_time;
            let en2 = this.view_result[j].end_time;
            if (this.isIntersectBetweenSegment(st, en, st2, en2)) {
              ok = 0;
              break;
            }
          }
        } else {
          ok = 0;
        }
        if (ok === 0) {
          return [];
        }
      }
      return post.timezone;
    }
    else {
      for (let i = 0; i < post.timezone.length; i = i + 2) {
        let st = post.timezone[i];
        let en = post.timezone[i + 1];
        let ok = 1;
        if (start_time.getTime() <= st.getTime() && en.getTime() <= end_time.getTime()) {
          ok = 1;
          for (let j = 0; j < this.view_result.length; j = j + 1) {
            let st2 = this.view_result[j].start_time;
            let en2 = this.view_result[j].end_time;
            if (this.isIntersectBetweenSegment(st, en, st2, en2)) {
              ok = 0;
              break;
            }
          }
        } else {
          ok = 0;
        }
        if (ok === 1) {
          return [st, en];
        }
      }
      return [];
    }
  }

  goSchedule() {
    let start_time = this.start_time;
    let end_time = this.end_time;
    this.view_result = [];
    let result: Post[] = [];
    let save: Post[] = [];
    this.expected_gain = 0;

    this.postService.getPosts().then(
      posts => {
        save = posts.filter(x => this.isIntersectWithSuccess(x, start_time, end_time).length > 0);
        while (save.length > 0) {
          let x = save[0];
          for (let i = 1; i < save.length; i = i + 1) {
            if (this.getWeight(x, 0.5) < this.getWeight(save[i], 0.5)) {
              x = save[i];
            }
          }
          if (this.getWeight(x, 0.5) < 0.001) break;  // useless alba
          result.push(x);
          let temp = this.isIntersectWithSuccess(x, start_time, end_time);
          for(let i = 0; i < temp.length; i = i + 2) {
            this.expected_gain = this.expected_gain + (temp[i+1].getTime() - temp[i].getTime()) / 3600000 * x.pay_per_hour;
            this.view_result.push(new schResult(temp[i], temp[i+1], x));
          }
          save = save.filter(x => this.isIntersectWithSuccess(x, start_time, end_time).length > 0);
        }
        result.sort((a, b) => {
          return a.timezone[0].getTime() - b.timezone[0].getTime();
        });
        this.view_result.sort((a, b) => {
          return a.start_time.getTime() - b.start_time.getTime();
        });
        this.post_list = result;
        this.updateCenterCoord();
      },
      err => {
        console.log(err);
      }
    );
  }

  getStringFromTime(date: Date) {
    return date.getHours() + ":" + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes());
  }

  getTimeString(idx: number): string {
    let st: Date = this.view_result[idx].start_time;
    let en: Date = this.view_result[idx].end_time;
    return this.getStringFromTime(st) + " - " + this.getStringFromTime(en);
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
