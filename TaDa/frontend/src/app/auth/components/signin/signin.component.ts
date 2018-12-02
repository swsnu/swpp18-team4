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

  ngOnInit() {
    if (this.userService.isLoggedIn()) {
      this.router.navigateByUrl('/');
    }
  }

  onClickSignIn() {
    const signinForm = document.forms['form'];
    const emailInput = signinForm['email'].value;
    const passwordInput = signinForm['password'].value;

    this.userService.signin(emailInput, passwordInput).then(
      (response: Response) => {
        this.userService.getUser(response['id']).then(
          user => {
          this.userService.setLoginUser(user);
          //localStorage.setItem('localUser', JSON.stringify(user));
          localStorage.setItem('userEmail', user.email);
          localStorage.setItem('userPassword', user.password);
        });
        this.router.navigateByUrl('/');
      },

      (error: HttpErrorResponse) => {
        alert('Login failed!');
      });
    }

    onClickSignUp() {
      this.router.navigateByUrl('signup');
    }
}
