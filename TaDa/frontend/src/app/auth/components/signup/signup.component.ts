import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from "../../../core/services/user.service";
import { User } from "../../../core/models/user";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  as_employer: boolean;
  signup_user: User;

  password_confirm: string;
  check_email: boolean = false;
  check_password: boolean = false;
  check_nickname: boolean = false;
  check_license: boolean = false;
  is_SNUmail: boolean = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private toastrService: ToastrService
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

  /* When user clicks 'Check Duplicate' buttons */
  onClickcheckDuplicateEmail(){
    this.signup_user.email = this.signup_user.email.trim();
    /*this.userService.checkDuplicateEmail(this.signup_user.email).then(
      (res: Response) => {
        if (res['isUnique'] == 'true') {
          this.check_email = true;
        } else {
          this.toastrService.warning('이메일 중복! 다시 입력해주세요');
        }
    })*/
    this.check_email = true;
  }

  onClickcheckDuplicateNickname() {
    if (!this.validateEmail()) {
      console.log('wrong input')
      return;
    }
    this.signup_user.nickname = this.signup_user.nickname.trim();
    this.userService.checkDuplicateNickname(this.signup_user.nickname).then(
      (res: Response) => {
        if (res['isUnique'] == 'true') {
          this.check_nickname = true;
        } else {
          this.toastrService.warning('닉네임 중복! 다시 입력해주세요');
        }
  })}

  onClickcheckBusinessLicense() {
    //TODO: 웹크롤링....
    this.check_license = true;
  }
  onClickClear() {
    this.signup_user = new User();
    this.check_email = false;
    this.check_license = false;
    this.check_password = false;
    this.check_nickname = false;
  }

  onClickConfirm() {
    this.check_password = (this.password_confirm === this.signup_user.password);
    const errormsg = this.build_errmsg();
    /* if no error, send email to user */
    if (errormsg.length == 0) {
      this.userService.signup(this.signup_user).then(
        res => {
          this.userService.sendEmail(this.signup_user).then(
            _ => {
              this.router.navigate(['signin']);
            }
          )
        }
      )

    } else {
      errormsg.forEach(error => {
        this.toastrService.warning(error);
      })
    }
  }
  //sendEmailAuthenticationNumber() {}

  /* check validity of each field. These are used in html form */
  validateEmail() {
    if (this.signup_user.email) {
      this.signup_user.email = this.signup_user.email.trim();
    }
    let reg_email = /^[^@\s]+@[^@.\s]+.[a-z]{2,3}/
    return reg_email.test(this.signup_user.email);
  }

  validatePassword() {
    let lowercase: boolean = (/[a-z]/).test(this.signup_user.password);
    let uppercase: boolean = (/[A-Z]/).test(this.signup_user.password);
    let decimalcase: boolean = (/[0-9]/).test(this.signup_user.password);       
    return (this.signup_user.password.length >= 8) && lowercase && uppercase && decimalcase;
  }

  validateNickname() {
    this.signup_user.nickname = this.signup_user.nickname.trim();
    return (this.signup_user.nickname.length >= 3);    
  }

  /* make error msg checking all conditions */
  build_errmsg() {
    let msg: string[] = Array();
    if (!this.check_email) {
      msg.push('이메일 중복 체크를 해주세요');
    }
    if (!this.check_password) {
      msg.push('비밀번호가 제대로 입력되었는지 확인해주세요');
    }
    if (!this.as_employer && !this.check_nickname) {
      msg.push('닉네임 중복 체크를 해주세요');
    }
    if(this.as_employer && !this.check_license) {
      msg.push('사업자 등록 번호를 확인해주세요')
    }
    console.log(msg);
    return msg;
  }
}