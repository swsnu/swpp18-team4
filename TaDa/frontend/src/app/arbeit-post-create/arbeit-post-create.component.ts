import { Component, OnInit } from '@angular/core';
import { ArbeitService } from '../arbeit.service';
import { LoginUserService } from '../log-in-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-arbeit-post-create',
  templateUrl: './arbeit-post-create.component.html',
  styleUrls: ['./arbeit-post-create.component.css']
})
export class ArbeitPostCreateComponent implements OnInit {
  title: string;
  region: string;
  arbeit_type: string;
  pay: string; // change into number when createArbeitPost()
  content: string;
  manager_name: string;
  manager_phone: string;
  time_zone: string;

  constructor(
    private loginUserService: LoginUserService,
    private arbeitService: ArbeitService,
    private router: Router,
  ) { }

  ngOnInit() {
    //this.loginUserService.isLoggedIn();  // abort user when unauthorized
  }

  isValidInput(input: string) {
    if (typeof input === 'undefined') {
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

  confirm(): void {
    // region
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
      //this.arbeitService.createArbeitPost();
    }
  }

  //this function can be deleted
  back(): void {
    const sure_of_back = confirm('정말 나가시겠습니까? 변경사항이 저장되지 않을 수 있습니다.');
    if (sure_of_back) {
      this.router.navigateByUrl(`/arbeit`);
    } else {
      return;
    }
  }
}
