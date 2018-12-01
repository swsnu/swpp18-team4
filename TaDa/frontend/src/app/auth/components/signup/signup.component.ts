import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../../core/services/user.service";
import {User} from "../../../core/models/user";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  as_employer: boolean;
  signup_user: User;
  constructor(
    private router: Router,
    private userService: UserService,
  ) { }

  ngOnInit() {
  }

  onClickConfirm() {
    /* 로그인하고, 해당 마이페이지로 이동
    this.userService.Signup();
    .then 로그인
    .then this.router.navigateByUrl('user/'+1);
    */
  }
  sendEmailAuthenticationNumber() {}
}
