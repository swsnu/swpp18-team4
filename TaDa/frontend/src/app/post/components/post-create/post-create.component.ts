import { Component, OnInit } from '@angular/core';
import { Post } from '../../../core/models/post';
import { ArbeitTypeEnum } from '../../../core/models/enums/arbeit-type-enum.enum';
import { RegionEnum } from '../../../core/models/enums/region-enum.enum';
import { HowToPayEnum } from '../../../core/models/enums/how-to-pay-enum.enum';

import { Router } from '@angular/router';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
  })
  export class PostCreateComponent implements OnInit {
  new_post: Post;
  region_enum_list: string[];
  arbeit_type_enum_list: string[];
  how_to_pay_enum_list: string[];
  dead_line: Date;
  model;

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    this.new_post = new Post();
    this.region_enum_list = Object.values(RegionEnum);
    this.arbeit_type_enum_list = Object.values(ArbeitTypeEnum);
    this.how_to_pay_enum_list = Object.values(HowToPayEnum);
    this.dead_line = new Date();
  }

  create(): void {
    //converJsonToDate 해야함
    this.router.navigateByUrl('/post/list');
  }
  back(): void {
    this.router.navigateByUrl('/post/list');
  }

  typechecker(input): void {
    console.log(typeof input);
  }
  converJsonToDate(input_json): Date {
    const object_to_json = JSON.stringify(input_json);
    const json_to_date = JSON.parse(object_to_json);

    const converted_date = new Date(json_to_date.year, json_to_date.month - 1, json_to_date.day, 23, 59, 59);
    console.log(converted_date);
    return converted_date;
  }
  // create를 눌렀을 때 조건이 만족되지 않은 input box는 빨간색 테두리
  // 그리고 구현법은 classname을 설정해주는 것으로!
}
