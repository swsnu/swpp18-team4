import { Component, OnInit } from '@angular/core';
import { LoginUserService } from "../log-in-user.service";
import { ArbeitService } from "../arbeit.service";
import { Router } from "@angular/router";
import { ArbeitPost } from "../ArbeitPost";

@Component({
  selector: 'app-arbeit-post-edit',
  templateUrl: './arbeit-post-edit.component.html',
  styleUrls: ['./arbeit-post-edit.component.css']
})
export class ArbeitPostEditComponent implements OnInit {
  arbeitpost: ArbeitPost;

  view_write: boolean;

  constructor(
    private loginUserService: LoginUserService,
    private arbeitService: ArbeitService,
    private router: Router,
  ) { }

  ngOnInit() {
    //this.loginUserService.isLoggedIn();  // abort user when unauthorized
  }

  isValidInput(input: string | any) {
    if (typeof input !== 'string' ) return ;
    input = input.trim();
    if (input === '') {
      return false;
    } else {
      return true;
    }
  }

  view_write_tab(): void {
    this.view_write = true;
    document.getElementById('write-tab-button').setAttribute('class', 'Clicked_tab');
    document.getElementById('preview-tab-button').setAttribute('class', 'unClicked_tab');
  }
  view_preview_tab(): void {
    this.view_write = false;
    document.getElementById('write-tab-button').setAttribute('class', 'unClicked_tab');
    document.getElementById('preview-tab-button').setAttribute('class', 'Clicked_tab');
  }

  confirm(): void {
    // region
    if (!this.isValidInput(this.arbeitpost.region)) {
      alert('지역을 입력해 주세요.');
    } else if (!this.isValidInput(this.arbeitpost.arbeit_type)) {
      alert('아르바이트 종류를 입력해 주세요.');
    } else if (!this.isValidInput(this.arbeitpost.pay)) {
      alert('시급을 입력해 주세요.');
    } else if (!this.isValidInput(this.arbeitpost.title)) {
      alert('제목을 입력해 주세요.');
    } else if (!this.isValidInput(this.arbeitpost.content)) {
      alert('내용을 입력해 주세요.');
    } else if (!this.isValidInput(this.arbeitpost.manager_name)) {
      alert('담당자 이름을 입력해 주세요.');
    } else if (!this.isValidInput(this.arbeitpost.manager_phone)) {
      alert('담당자 전화번호를 입력해 주세요.');
    } else {
      //this.arbeitService.updateArbeitPost();
    }
  }

  back(): void {
    const sure_of_back = confirm('정말 나가시겠습니까? 변경사항이 저장되지 않을 수 있습니다.');
    if (sure_of_back) {
      this.router.navigateByUrl(`/${this.arbeitpost.id}`);
    } else {
      return;
    }
  }

}
