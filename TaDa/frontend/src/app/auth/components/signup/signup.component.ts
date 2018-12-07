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
  check_email: boolean = false;
  check_nickname: boolean = false;
  is_SNUmail: boolean = false;

  constructor(
    private router: Router,
    private userService: UserService,
  ) { }


  ngOnInit() {

    /* If user is already logged in, redirect to main page */
    if (this.userService.isLoggedIn()) {
      this.router.navigateByUrl('/');
    }

    /* If user has no token, create one */ 
    const token = this.userService.checkCSRF();
    if (token == null) {
      this.userService.createToken();      
    }
    this.signup_user = new User();
  }
  onClickcheckBusinessLicense() {

  }
  onClickcheckDuplicateEmail(){
    this.check_email = true;

  }
  onClickConfirm() {
    /* 로그인하고, 해당 마이페이지로 이동
    this.userService.Signup();
    .then 로그인
    .then this.router.navigateByUrl('user/'+1);
    */
  }
  sendEmailAuthenticationNumber() {}


  /* check validity of each field. These are used in html form*/
  validateEmail() {
    if (this.signup_user.email) {
      this.signup_user.email = this.signup_user.email.trim();
    }
    let reg_email = /^[^@\s]+@[^@.\s]+.[a-z]{2,3}$/
    return reg_email.test(this.signup_user.email);
  }

  validatePassword() {
    let lowercase: boolean = (/[a-z]/).test(this.signup_user.password)
    let uppercase: boolean = (/[A-Z]/).test(this.signup_user.password)
    let decimalcase: boolean = (/[0-9]/).test(this.signup_user.password)       
    return (this.signup_user.password.length >= 8) && lowercase && uppercase && decimalcase    
  }
}
