import { Component, OnInit } from '@angular/core';
import { User } from "../../core/models/user";
import { UserService } from "../../core/services/user.service";
import { Router } from "@angular/router";


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  is_logged_in: boolean;
  current_user: User;
  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
    /* get current user state */
    //this.is_logged_in = this.userService.isLoggendIn();
    //this.current_user = this.userService.getCurrentUser();

    /*
    * this statements to mock. *
    this.is_logged_in = true;
    this.current_user = <User>{ id:4 };
    */
  }

  logOut() {
    //this.userService.logOut();
    this.router.navigateByUrl('');
  }
  toUserPage() {
    const current_id = this.current_user.id;
    this.router.navigateByUrl('user/'+current_id);
  }
}
