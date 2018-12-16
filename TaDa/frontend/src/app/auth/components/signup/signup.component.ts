import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { UserService } from "../../../core/services/user.service";
import { User } from "../../../core/models/user";
import { ToastrService } from 'ngx-toastr';
import { TypeEnum } from '../../../core/models/enums/type-enum.enum';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signup_user: User;
  as_employee = true;

  password_confirm: string;
  check_email: boolean = false;
  check_password: boolean = false;
  check_nickname: boolean = false;
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
    if (this.validateEmail() === false) {
      this.toastrService.warning('이메일 형식을 다시 확인해주세요');
      return;
    }
    this.userService.checkDuplicateEmail(this.signup_user.email).then(
      response => {
        if (response.isUnique === true) {
          this.check_email = true;
        } else {
          this.toastrService.warning('이메일 중복! 다시 입력해주세요');
        }
    });
  }

  onClickcheckDuplicateNickname() {
    if (this.validateNickname() === false) {
      this.toastrService.warning('닉네임은 세글자 이상 입력해주세요');
      return;
    }
    this.signup_user.nickname = this.signup_user.nickname.trim();
    this.userService.checkDuplicateNickname(this.signup_user.nickname).then(
      (res: Response) => {
        if (res['isUnique'] === true) {
          this.check_nickname = true;
        } else {
          this.toastrService.warning('닉네임 중복! 다시 입력해주세요');
        }
    })
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

    /* if there's no error, refines the User class */
    } else {
      if ( this.as_employee === true) {
        this.signup_user.user_type = TypeEnum.EE;
        this.signup_user.company_name = null;
        this.signup_user.company_address = null;
      } else {
        this.signup_user.user_type = TypeEnum.ER;
        this.signup_user.nickname = null;
      }
      this.userService.signup(this.signup_user).then(
        res => {
          if ( this.as_employee === true) {
            alert('회원가입 성공! 다시 로그인 해주세요');
          } else {
            alert('회원가입 성공! 마이페이지에서 정보 등록 후 계정이 활성화됩니다!');
          }
          this.router.navigate(['signin']);
        }
    );
    }
  }

  /* check validity of each field. These are used in html form */
  validateEmail(): boolean {
    if (this.signup_user.email == null) {
      return false;
    }
    this.signup_user.email = this.signup_user.email.trim();
    const reg_email = /^[^@\s]+@[^@.\s]+.[a-z]{2,3}/
    return reg_email.test(this.signup_user.email);
  }

  validatePassword(): boolean {
    if (this.signup_user.password == null) {
      return false;
    }
    const lowercase: boolean = (/[a-z]/).test(this.signup_user.password);
    const uppercase: boolean = (/[A-Z]/).test(this.signup_user.password);
    const decimalcase: boolean = (/[0-9]/).test(this.signup_user.password);
    return (this.signup_user.password.length >= 8) && (lowercase || uppercase) && decimalcase;
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
    const msg: string[] = Array();
    if (!this.check_email) {
      msg.push('이메일 중복 체크를 해주세요');
    }
    if (!this.check_password) {
      msg.push('비밀번호가 제대로 입력되었는지 확인해주세요');
    }
    if (this.as_employee && !this.check_nickname) {
      msg.push('닉네임 중복 체크를 해주세요');
    }
    if (!this.as_employee) {
      this.signup_user.company_name = this.signup_user.company_name.trim();
      this.signup_user.company_address = this.signup_user.company_address.trim();
      if (this.signup_user.company_name == null) {
        msg.push('회사 이름을 입력해주세요');
      }
      if (this.signup_user.company_address == null) {
        msg.push('회사 주소를 입력해주세요');
      }
    }
    return msg;
  }
}
