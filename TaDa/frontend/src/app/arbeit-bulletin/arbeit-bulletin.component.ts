import { Component, OnInit } from '@angular/core';
import { ArbeitPost } from '../Classes/ArbeitPost';
import { mockArbeitPost } from '../mock-ArbeitPost';
import { UserService } from '../user.service';
import { ArbeitService } from '../arbeit.service';
import { TimezoneService } from '../timezone.service';
import { User, Employer } from '../Classes/User';
import { TimeZone, Time } from '../Classes/TimeZone';


@Component({
  selector: 'app-arbeit-bulletin',
  templateUrl: './arbeit-bulletin.component.html',
  styleUrls: ['./arbeit-bulletin.component.css']
})

export class ArbeitBulletinComponent implements OnInit {
  full_arbeit_list: ArbeitPost[];
  mockData: ArbeitPost[]; // array to store all arbeit data.
  dataToShow: ArbeitPost[]; // only array data in dataToShow is shown in bulletin board.

  /*variable for filtering */

  time_1: Time = {
    month: 10,
    date:  22,
    day: 3,
    hour: 14,
    minute: 5,
  };

  time_2: Time = {
    month: 10,
    date:  22,
    day: 3,
    hour: 16,
    minute: 1,
  }

  time_3: Time = {
    month: 11,
    date:  23,
    day: 3,
    hour: 11,
    minute: 4,
  };

  time_4: Time = {
    month: 11,
    date:  24,
    day: 3,
    hour: 16,
    minute: 0,
  };
  zone1: TimeZone = {
    start: this.time_1,
    end: this.time_2,
  };
  zone2: TimeZone = {
    start: this.time_3,
    end: this.time_4,
  };

  filter_timeArray = [this.zone1, this.zone2];
  filter_day: number;
  filter_start_hour: number;
  filter_start_min: number;
  filter_end_hour: number;
  filter_end_min: number;

  /*variable for keyword searching */
  search_keyword: string;
  search_criteria: string;

  constructor(
    private userService: UserService,
    private arbeitService: ArbeitService,
    private timezoneService: TimezoneService
  ) {}

  ngOnInit() {
    //this.getArbeitList();
    //this.getStarfromEmployer();

    this.mockData = mockArbeitPost;
    this.dataToShow = this.mockData;

  }
  getAuthorNameByID(id: number): string {
    return '아기상어';
  }

  getArbeitList() {
    this.arbeitService.getArbeitPosts().then(
      posts => this.full_arbeit_list = posts);
  }

  getStarfromEmployer() {
    if (this.userService.employer_list == null) {
      this.userService.getEmployerList();
    }

    for (const post of this.full_arbeit_list) {
      let employer: Employer;
      employer = this.userService.employer_list.find(
        tmp => tmp.id === post.author_id);
        post.star = employer.star;
    }
  }

  sort(sorting_criteria: number) {
    if (sorting_criteria === 0) {// sort by register date
      this.dataToShow.sort(function(a, b) {
        return a.register_date < b.register_date ? 1 :
               a.register_date > b.register_date ? -1 : 0;
      });
    } else if (sorting_criteria === 1) { // sort by pay
      this.dataToShow.sort(function(a, b) {
        return a.pay < b.pay ? 1 :
               a.pay > b.pay ? -1 : 0;
      });
    } else { // sort by star
      this.dataToShow.sort(function(a, b) {
        return a.star < b.star ? 1 :
               a.star > b.star ? -1 : 0;
      });
    }
  }

  add_timezone() {
    const startTime: Time = {
      month: -1, date: -1, day: this.filter_day,
      hour: this.filter_start_hour, minute: this.filter_start_min,
    };
    const endTime: Time = {
      month: -1, date: -1, day: this.filter_day,
      hour: this.filter_end_hour, minute: this.filter_end_min,
    };
    const timezone: TimeZone = {
      start: startTime, end: endTime
    };
    this.filter_timeArray.push(timezone);

    this.clear_field();
  }

  clear_field(): void {
    this.filter_day = undefined;
    this.filter_start_hour = undefined; this.filter_start_min = undefined;
    this.filter_end_hour = undefined; this.filter_end_min = undefined;
  }

  remove_timezone(index: number) {
    this.filter_timeArray.splice(index, 1);
  }

  search(): void {
    this.dataToShow = this.mockData; // initialize dataToShow
    /* do filtering */

    /* do keyword searching*/
    if (typeof this.search_criteria === 'undefined' ||
        typeof this.search_keyword === 'undefined' ) {
          return ;
    } else {
        this.search_keyword = this.search_keyword.trim();
        if (this.search_keyword === '') {
          return;
        } else {
          this.doKeywordSearch();
        }
    }
  }

  doKeywordSearch(): void {
    if (this.dataToShow) {
      const temp_data: ArbeitPost[] = [];
      if (this.search_criteria === '제목') {
        for (const post of this.dataToShow) {
          if (post.title.includes(this.search_keyword)) {
            temp_data.push(post);
          }
        }
      } else if (this.search_criteria === '내용') {
        for (const post of this.dataToShow) {
          if (post.content.includes(this.search_keyword)) {
            temp_data.push(post);
          }
        }
      } else {
        for (const post of this.dataToShow) {
          if (post.content.includes(this.search_keyword) || post.title.includes(this.search_keyword)) {
            temp_data.push(post);
          }
        }
      }
      this.dataToShow = temp_data;
    }
  }

  iter(num: number): number[] {
    if (num < 1) {
      return [];
    } else {
      const temp_array = [];
      for (let i = 0; i < num; i++) {
        temp_array.push(i);
      }
      return temp_array;
    }
  }

}
