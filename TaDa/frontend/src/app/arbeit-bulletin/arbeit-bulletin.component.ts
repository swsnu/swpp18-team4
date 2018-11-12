import { Component, OnInit } from '@angular/core';
import { ArbeitPost } from '../Classes/ArbeitPost';
import { mockArbeitPost } from '../mock-ArbeitPost';

@Component({
  selector: 'app-arbeit-bulletin',
  templateUrl: './arbeit-bulletin.component.html',
  styleUrls: ['./arbeit-bulletin.component.css']
})
export class ArbeitBulletinComponent implements OnInit {
  mockData: ArbeitPost[]; // array to store all arbeit data.
  dataToShow: ArbeitPost[]; // only array data in dataToShow is shown in bulletin board.

  /*variable for keyword searching */
  search_keyword: string;
  search_criteria: string;

  constructor() { }

  ngOnInit() {
    this.mockData = mockArbeitPost;
    this.dataToShow = this.mockData;
  }
  getAuthorNameByID(id: number): string {
    return '아기상어';
  }
  search(): void {
    this.dataToShow = this.mockData; // initialize dataToShow
    /* do filtering */



    /* do keyword searching*/
    if(typeof this.search_criteria === 'undefined' ||
        typeof this.search_keyword === 'undefined' ) {
          return ;
    } else {
        this.search_keyword = this.search_keyword.trim();
        if(this.search_keyword === ''){
          return ;
        } else {
          this.doKeywordSearch();
        }
    }
  }
  doKeywordSearch(): void {
    if(this.dataToShow) {
      let temp_data: ArbeitPost[] = [];
      if(this.search_criteria === '제목') {
        for (const post of this.dataToShow) {
          if(post.title.includes(this.search_keyword)) {
            temp_data.push(post);
          }
        }
      } else if(this.search_criteria === '내용') {
        for (const post of this.dataToShow) {
          if(post.content.includes(this.search_keyword)) {
            temp_data.push(post);
          }
        }
      } else {
        for (const post of this.dataToShow) {
          if(post.content.includes(this.search_keyword) || post.title.includes(this.search_keyword)) {
            temp_data.push(post);
          }
        }
      }
      this.dataToShow = temp_data;
    }
  }
}
