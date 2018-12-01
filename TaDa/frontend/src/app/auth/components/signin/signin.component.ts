import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import {UserService} from "../../../core/services/user.service";

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
  ngOnInit() {}

  onClickSignIn() {
    //this.userService....
    this.router.navigateByUrl('/');
  }
  onClickSignUp() {
    this.router.navigateByUrl('signup');
  }

}
