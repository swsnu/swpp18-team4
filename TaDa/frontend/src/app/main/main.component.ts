import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from "../user.service";
import {Employer, User} from "../Classes/User";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  employer: Employer;
  constructor(
    private router: Router,
    private userService: UserService,
  ) {}

  ngOnInit() {
    this.userService.getEmployer(2)
      .then(employer => this.employer = employer);
  }

  onClickArbeitBulletin(): void {
    this.router.navigateByUrl('/arbeit');
  }
}
