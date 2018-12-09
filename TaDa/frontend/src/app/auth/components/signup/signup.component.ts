import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from "../../../core/services/user.service";
import { User } from "../../../core/models/user";
import { ToastrService, ToastrComponentlessModule } from 'ngx-toastr';

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
  onClickcheckDuplicateEmail() {

    /* check the validity of input email */
    if (this.validateEmail() == false) {
      this.toastrService.warning('이메일 형식을 다시 확인해주세요');
      return;
    }
    this.userService.checkDuplicateEmail(this.signup_user.email).then(
      response => {
        console.log('response is ####'+response);
        if (response.isUnique == true) {
          console.log('isUnique &&&&&&&&&&&&&&&&&&');
          this.check_email = true;
        } else {
          this.toastrService.warning('이메일 중복! 다시 입력해주세요');
        }
    })
  }

  onClickcheckDuplicateNickname() {
    this.signup_user.nickname = this.signup_user.nickname.trim();
    if (this.validateNickname() == false) {
      this.toastrService.warning('닉네임은 세글자 이상 입력해주세요');
      return;
    }
    this.signup_user.nickname = this.signup_user.nickname.trim();
    this.userService.checkDuplicateNickname(this.signup_user.nickname).then(
      (res: Response) => {
        if (res['isUnique'] == true) {
          this.check_nickname = true;
        } else {
          this.toastrService.warning('닉네임 중복! 다시 입력해주세요');
        }
    })
  }

  onClickcheckBusinessLicense() {
    //TODO: 웹크롤링....?
    this.check_license = true;
  }

  /* Actual Signup logic */
  onClickConfirm() {  
    /* Checks validity of all input */
    this.check_password = this.validatePassword() && (this.password_confirm === this.signup_user.password);
    const errormsg = this.build_errmsg();

    /* alert message if there is any error */
    if (errormsg.length > 0) {
      errormsg.forEach(error => {
        this.toastrService.warning(error);
      })

    /* if there's no error, send verification mail to user */
    } else {
      this.userService.signup(this.signup_user).then(
        res => {
          this.userService.sendEmail(this.signup_user).then(
            _ => {
              alert('입력해주신 이메일 주소로 인증 메일을 보냈습니다! 인증 메일을 확인해주셔야 회원 가입이 완료됩니다');
              this.router.navigate(['signin']);
            }
        )})
    }
  }

  /* check validity of each field. These are used in html form */
  validateEmail(): boolean {
    if (this.signup_user.email == null) {
      return false;
    }
    this.signup_user.email = this.signup_user.email.trim();
    let reg_email = /^[^@\s]+@[^@.\s]+.[a-z]{2,3}/
    return reg_email.test(this.signup_user.email);
  }

  validatePassword(): boolean {
    if (this.signup_user.password == null) {
      return false;
    }
    let lowercase: boolean = (/[a-z]/).test(this.signup_user.password);
    let uppercase: boolean = (/[A-Z]/).test(this.signup_user.password);
    let decimalcase: boolean = (/[0-9]/).test(this.signup_user.password);       
    return (this.signup_user.password.length >= 8) && lowercase && uppercase && decimalcase;
  }

  validateNickname(): boolean {
    if (this.signup_user.nickname == null) {
      return false;
    }
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
    return msg;
  }
}