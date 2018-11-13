import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {UserService} from "../user.service";
import {Employer, User} from "../Classes/User";
import {ArbeitPost} from "../Classes/ArbeitPost";
import {ArbeitService} from "../arbeit.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  employer: Employer;
  arbeit: ArbeitPost;
  constructor(
    private router: Router,
    private userService: UserService,
    private arbeitService: ArbeitService,
  ) {}

  ngOnInit() {
    this.userService.getEmployer(2)
      .then(employer => this.employer = employer);
    this.arbeitService.getArbeitPostById(30)
      .then(arbeit => this.arbeit = arbeit);
  }

  onClickArbeitBulletin(): void {
    this.router.navigateByUrl('/arbeit');
  }
}
