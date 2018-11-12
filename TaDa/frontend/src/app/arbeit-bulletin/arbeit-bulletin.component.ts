import { Component, OnInit } from '@angular/core';
import { ArbeitPost } from '../Classes/ArbeitPost';
import { mockArbeitPost } from '../mock-ArbeitPost';

@Component({
  selector: 'app-arbeit-bulletin',
  templateUrl: './arbeit-bulletin.component.html',
  styleUrls: ['./arbeit-bulletin.component.css']
})
export class ArbeitBulletinComponent implements OnInit {
  mockData: ArbeitPost[];
  constructor() { }

  ngOnInit() {
    this.mockData = mockArbeitPost;
  }
  getAuthorNameByID(id: number): string {
    return '아기상어';
  }
}
