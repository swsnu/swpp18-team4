import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "../../../core/services/user.service";
import { Response } from '@angular/http';

@Component({
  selector: 'app-signup-mail',
  templateUrl: './signup-mail.component.html',
  styleUrls: ['./signup-mail.component.css']
})

/* navigate to this page when user clicks url in signUp verification mail */
export class SignupMailComponent implements OnInit {
  message: string;
  if_success: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) { }
  
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const token = this.route.snapshot.paramMap.get('token');

    this.userService.verificate(id, token).then(
      (response: Response) => {
        this.message = response['message'];
        this.if_success = response['successed'];
      }
    )
  }

  onClickSignUp() {
    this.router.navigateByUrl('signup');
  }

  onClickSignIn() {
    this.router.navigateByUrl('signin');
  }  
}
