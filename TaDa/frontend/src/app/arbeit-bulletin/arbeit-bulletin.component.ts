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
  constructor() { }

  ngOnInit() {
    this.mockData = mockArbeitPost;
    this.dataToShow = this.mockData;
  }
  getAuthorNameByID(id: number): string {
    return '아기상어';
  }
}
