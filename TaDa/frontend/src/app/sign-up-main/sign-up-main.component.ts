import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from "../user.service";

@Component({
  selector: 'app-sign-up-main',
  templateUrl: './sign-up-main.component.html',
  styleUrls: ['./sign-up-main.component.css']
})
export class SignUpMainComponent implements OnInit {

  constructor(
    private router: Router,
    private userService: UserService) { }

  ngOnInit() {
  }


  onClickSignUpEmployee(): void {
    this.router.navigateByUrl('sign_up/employee');
  }

  onClickSignUpEmployer(): void {
    this.router.navigateByUrl('sign_up/employee');
  }
}
