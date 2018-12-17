import { Component, OnInit } from '@angular/core';
import { Post } from '../../../core/models/post';
import { mock_posts } from '../../../shared/mock/mock-post';

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

  constructor() { }

  ngOnInit() {
    this.post_list = [];
    this.post_list.push(mock_posts[0]);
    //this.post_list.push(mock_posts[1]);
    this.post_list.push(mock_posts[4]);
    this.post_list.push(mock_posts[5]);
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
    if(dist < 5) return 16;
    let magic_number: number = 9 - Math.log2(dist / 50000);
    return Math.ceil(magic_number);
  }
}
