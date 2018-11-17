import {Component, OnInit} from '@angular/core';
import {ArbeitService} from '../arbeit.service';
import {LoginUserService} from '../log-in-user.service';
import {Router} from '@angular/router';
import {ArbeitPost} from "../Classes/ArbeitPost";
import {ArbeitRegionEnum} from "../Enums/ArbeitRegionEnum";
import {ArbeitTypeEnum} from "../Enums/ArbeitTypeEnum";
import { CurrentArbeitPostService } from "../current-arbeit-post.service";
import {TimeZone} from "../Classes/TimeZone";

@Component({
  selector: 'app-arbeit-post-create',
  templateUrl: './arbeit-post-create.component.html',
  styleUrls: ['./arbeit-post-create.component.css'],

})
export class ArbeitPostCreateComponent implements OnInit {
  title: string;
  region: string;
  arbeit_type: string;
  pay: number; // change into number when createArbeitPost()
  content: string;
  manager_name: string;
  manager_phone: string;
  time_zone: TimeZone[];

  test: string;
  public temp_post: ArbeitPost;
  selectedFile: File;

  constructor(
    private loginUserService: LoginUserService,
    private arbeitService: ArbeitService,
    private router: Router,
    private currentArbeitPostService: CurrentArbeitPostService,
  ) { }

  ngOnInit() {
    this.temp_post = new ArbeitPost();
    //this.loginUserService.isLoggedIn();  // abort user when unauthorized
  }

  isValidInput(input: string | number) {
    if (typeof input === 'undefined') {
      return false;
    } else if(typeof input === 'number') {
      if (input < 0) return false;
      else return true;
    } else if(typeof input === 'object') {
      return false;
    } else {
      input = input.trim();
      if (input === '') {
        return false;
      } else {
        return true;
      }
    }
  }

  is_finished(): boolean {
    if (!this.isValidInput(this.region)) {
      alert('지역을 입력해 주세요.');
    } else if (!this.isValidInput(this.arbeit_type)) {
      alert('아르바이트 종류를 입력해 주세요.');
    } else if (!this.isValidInput(this.pay)) {
      alert('시급을 입력해 주세요.');
    } else if (!this.isValidInput(this.title)) {
      alert('제목을 입력해 주세요.');
    } else if (!this.isValidInput(this.content)) {
      alert('내용을 입력해 주세요.');
    } else if (!this.isValidInput(this.manager_name)) {
      alert('담당자 이름을 입력해 주세요.');
    } else if (!this.isValidInput(this.manager_phone)) {
      alert('담당자 전화번호를 입력해 주세요.');
    } else {
      return true;
    }
    return false;
  }

  make_temp_post() {
    //this.temp_post.author_id = this.loginUserService.LogInUser.id;
    this.temp_post.author_id = 1;
    this.temp_post.title = this.title;
    this.temp_post.content = this.content;
    //region
    if(this.region === '교내') {this.temp_post.region = ArbeitRegionEnum.School;}
    else if(this.region === '설입') {this.temp_post.region = ArbeitRegionEnum.SNUStation;}
    else if(this.region === '녹두') {this.temp_post.region = ArbeitRegionEnum.Nokdu;}
    else if(this.region === '낙성대') {this.temp_post.region = ArbeitRegionEnum.Nakdae;}
    else {this.temp_post.region = ArbeitRegionEnum.Extra;}
    //arbeit_type
    if(this.arbeit_type === '멘토링') {this.temp_post.arbeit_type = ArbeitTypeEnum.Mentoring;}
    else if(this.arbeit_type === '과외') {this.temp_post.arbeit_type = ArbeitTypeEnum.Tutoring;}
    else if(this.arbeit_type === '카페 알바') {this.temp_post.arbeit_type = ArbeitTypeEnum.Cafe;}
    else if(this.arbeit_type === 'IT') {this.temp_post.arbeit_type = ArbeitTypeEnum.IT;}
    else if(this.arbeit_type === '디자인 알바') {this.temp_post.arbeit_type = ArbeitTypeEnum.Design;}
    else {this.temp_post.arbeit_type = ArbeitTypeEnum.Extra;}
    //
    this.temp_post.pay = this.pay;
    //this.temp_post.time_zone = this.time_zone;
    this.temp_post.manager_name = this.manager_name;
    this.temp_post.manager_phone = this.manager_phone;
    //get now date
    const today = new Date();
    const s = today.getSeconds();
    const m = today.getMinutes();
    const h = today.getHours();
    const dd = today.getDate();
    const mm = today.getMonth()+1;
    const yyyy = today.getFullYear();
    const datestring = yyyy + '-' + mm + '-' + dd + 'T' + h + ':' + m + ':' + s;
    this.temp_post.register_date = new Date(datestring);
  }

  back(): void {
    this.router.navigateByUrl('/arbeit');
  }

  confirm(): void {
    const state = this.is_finished();
    if(state) {
      this.make_temp_post();
      this.arbeitService.createArbeitPost(this.temp_post);
      // 그림업로드
      this.router.navigateByUrl('/arbeit');
    } else {
      return ;
    }

  }

  //this function can be deleted
  preview(): void {
    const state = this.is_finished();
    if (state) {
      this.make_temp_post();
      console.log(this.temp_post.title);
      this.currentArbeitPostService.set(this.temp_post);

      this.router.navigateByUrl('/arbeit/create/preview');
      //window.open('arbeit/create/preview');
    } else {
      return;
    }
  }


  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }

  generateIter(num: number): number[] {
    if (num < 1) {
      return [];
    } else {
      let temp_array = [];
      for(let i=0; i<num; i++) {
        temp_array.push(i);
      }
      return temp_array;
    }
  }
}

