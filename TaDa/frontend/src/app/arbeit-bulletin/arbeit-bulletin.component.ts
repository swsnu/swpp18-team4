import { Component, OnInit } from '@angular/core';
import { ArbeitPost } from '../Classes/ArbeitPost';
import { mockArbeitPost } from '../mock-ArbeitPost';
import { UserService } from '../user.service';
import { ArbeitService } from '../arbeit.service';
import { TimezoneService } from '../timezone.service';
import { User, Employer } from '../Classes/User';
import { TimeZone } from '../Classes/TimeZone';


@Component({
  selector: 'app-arbeit-bulletin',
  templateUrl: './arbeit-bulletin.component.html',
  styleUrls: ['./arbeit-bulletin.component.css']
})

export class ArbeitBulletinComponent implements OnInit {
  full_arbeit_list: ArbeitPost[];
  mockData: ArbeitPost[]; // array to store all arbeit data.
  dataToShow: ArbeitPost[]; // only array data in dataToShow is shown in bulletin board.
  timeArray: TimeZone[];

  /*variable for filtering */
  filter_day: number;
  filter_start_hour: number;
  filter_start_min: number;
  filter_end_hour: number;
  filter_end_min = 10;

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

  generateIter(num: number, step: number): number[] {
    if (num < 1) {
      return [];
    } else {
      let temp_array = [];
      for(let i = 0; i < num; i += step) {
        temp_array.push(i);
      }
      return temp_array;
    }
  }


}
