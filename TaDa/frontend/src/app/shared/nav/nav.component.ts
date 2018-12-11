import { Component, OnInit } from '@angular/core';
import { User } from '../../core/models/user';
import { UserService } from '../../core/services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  current_user: User;
  constructor(
    private userService: UserService,
    private router: Router,
  ) { }

  ngOnInit() {
    /* get current user state */
    //this.current_user = this.userService.getCurrentUser();
  }

  logOut() {
    this.userService.signout();
    //localStorage.removeItem('userEmail');
    //localStorage.removeItem('userPassword');
    this.userService.setLoginUser(null);
  }

  toUserPage() {
    //const current_id = this.current_user.id;
    this.router.navigateByUrl('user/' + this.userService.getCurrentUser().id);

  }
}
