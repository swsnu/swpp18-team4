import { Component, OnInit } from '@angular/core';
import {LoginUserService} from "../log-in-user.service";
import {ArbeitService} from "../arbeit.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-arbeit-post-edit',
  templateUrl: './arbeit-post-edit.component.html',
  styleUrls: ['./arbeit-post-edit.component.css']
})
export class ArbeitPostEditComponent implements OnInit {
  view_write: boolean;

  constructor(
    private loginUserService: LoginUserService,
    private arbeitService: ArbeitService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

}
