import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../core/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Response } from '@angular/http';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  private emailInput: string = '';
  private passwordInput: string = '';

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
  }

  onClickSignIn() {
    this.userService.signin(this.emailInput, this.passwordInput).then(
      (response: Response) => {
        this.userService.getUser(response['id']).then(
          user => {
          this.userService.setLoginUser(user);
          sessionStorage.setItem('storedUser', JSON.stringify(user));
        });
        this.router.navigateByUrl('/');
      },

      /* If user information does not match, alert mesage and clear input */
      (error: HttpErrorResponse) => {
        this.emailInput = '';
        this.passwordInput = '';
        alert('로그인 실패!');
      });
    }
    onClickSignUp() {
      this.router.navigateByUrl('signup');
    }
}