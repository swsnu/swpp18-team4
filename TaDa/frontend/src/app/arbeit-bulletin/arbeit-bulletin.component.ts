import { Component, OnInit } from '@angular/core';
import { ArbeitPost } from '../Classes/ArbeitPost';
import { mockArbeitPost } from '../mock-ArbeitPost';
import { UserService } from '../user.service';
import { ArbeitService } from '../arbeit.service';
import { TimezoneService } from '../timezone.service';
import { User, Employer } from '../Classes/User';
import { TimeZone, Time } from '../Classes/TimeZone';
import { ArbeitRegionEnum } from '../Enums/ArbeitRegionEnum';
import { ArbeitTypeEnum } from '../Enums/ArbeitTypeEnum';


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
  filter_region = [false, false, false, false, false];
  filter_regionArray = [];
  filter_type = [false, false, false, false, false, false];
  filter_typeArray = [];
  filter_timeArray = [];
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
    protected timezoneService: TimezoneService
  ) {}

  ngOnInit() {
    //this.getArbeitList();
    //this.getStarfromEmployer();

    this.full_arbeit_list = this.dataToShow = mockArbeitPost;
    this.sort(0);
  }
  getAuthorNameByID(id: number): string {
    if(id == 4) {
      return '아기상어';
    } else {
      return 'jyp930';
    }
  }

  getArbeitList() {
    this.arbeitService.getArbeitPosts().then(
      posts => this.full_arbeit_list = this.dataToShow = posts);
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


  filter() {
    /* hardcoding- should be modified */
    if (this.filter_region[0]) {
      this.filter_regionArray.push(ArbeitRegionEnum.SNUStation);
    }
    if (this.filter_region[1]) {
      this.filter_regionArray.push(ArbeitRegionEnum.Nakdae);
    }
    if (this.filter_region[2]) {
      this.filter_regionArray.push(ArbeitRegionEnum.School);
    }
    if (this.filter_region[3]) {
      this.filter_regionArray.push(ArbeitRegionEnum.Nokdu);
    }
    if (this.filter_region[4]) {
      this.filter_regionArray.push(ArbeitRegionEnum.Extra);
    }
    if (this.filter_type[0]) {
      this.filter_typeArray.push(ArbeitTypeEnum.Mentoring);
    }
    if (this.filter_type[1]) {
      this.filter_typeArray.push(ArbeitTypeEnum.Tutoring);
    }
    if (this.filter_type[2]) {
      this.filter_typeArray.push(ArbeitTypeEnum.Cafe);
    }
    if (this.filter_type[3]) {
      this.filter_typeArray.push(ArbeitTypeEnum.IT);
    }
    if (this.filter_type[4]) {
      this.filter_typeArray.push(ArbeitTypeEnum.Design);
    }
    if (this.filter_type[5]) {
      this.filter_typeArray.push(ArbeitTypeEnum.Extra);
    }    



    /* actual filtering */
    if (this.filter_regionArray.length !== 0) {
      this.dataToShow = this.dataToShow.filter(
        element => this.filter_regionArray.includes(element.region));
    }
    if (this.filter_typeArray.length !== 0) {
      this.dataToShow = this.dataToShow.filter(
        element => this.filter_typeArray.includes(element.arbeit_type));

    }
    if (this.filter_timeArray.length !== 0) {
      this.dataToShow = this.dataToShow.filter(
        element => this.timezoneService.filterTime(element.time_zone, this.filter_timeArray));
    }
    this.filter_regionArray = [];
    this.filter_typeArray = [];

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
    if (this.filter_day != undefined && this.filter_start_hour != undefined) {
      const startTime: Time = {
        hour: this.filter_start_hour, minute: this.filter_start_min,
      };
      const endTime: Time = {
        hour: this.filter_end_hour, minute: this.filter_end_min,
      };
      const timezone: TimeZone = {
        month: -1, date: -1, day: this.filter_day,
        start: startTime, end: endTime
      };

      this.filter_timeArray.push(timezone);
      this.clear_timezone_field();
  }
  }

  clear_timezone_field(): void {
    this.filter_day = undefined;
    this.filter_start_hour = undefined; this.filter_start_min = undefined;
    this.filter_end_hour = undefined; this.filter_end_min = undefined;
  }

  remove_timezone(index: number) {
    this.filter_timeArray.splice(index, 1);
  }

  search(): void {
    this.dataToShow = this.full_arbeit_list; // initialize dataToShow
    /* do filtering */
    this.add_timezone();
    this.filter();

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
