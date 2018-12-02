import { Component, OnInit } from '@angular/core';
import {User} from '../models/user';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  connect: User;
  constructor(
    private userService: UserService,
  ) { }
  ngOnInit() {
    this.userService.getUser(1)
      .then(user => this.connect = user);
  }

}
