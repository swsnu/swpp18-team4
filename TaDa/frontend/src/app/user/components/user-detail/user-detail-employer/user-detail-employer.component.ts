import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/core/models/user';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-user-detail-employer',
  templateUrl: './user-detail-employer.component.html',
  styleUrls: ['./user-detail-employer.component.css']
})
export class UserDetailEmployerComponent implements OnInit {
  @Input('isMyPage') public isMyPage: boolean;
  @Input('user') public user: User;

  constructor() { }

  ngOnInit() {
  }

}
