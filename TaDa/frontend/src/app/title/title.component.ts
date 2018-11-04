import { Component, OnInit } from '@angular/core';
import { LoginUserService } from '../log-in-user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.css']
})
export class TitleComponent implements OnInit {
  constructor(
    private loginUserService: LoginUserService,
    private router: Router
  ) { }
  ngOnInit() {

  }
  isLogIned(): boolean {
    return this.loginUserService.isLogIned();
  }
  onClickTitleImage(): void {
    this.router.navigateByUrl('');
  }
  onClickMyPage(): void {
    if (this.loginUserService.getUserType() === 'Employee') {
      this.router.navigateByUrl('/employee_mypage');
    } else {
      this.router.navigateByUrl('/employer_mypage');
    }
  }
  onClickSignOut(): void {
    this.loginUserService.signOut();
  }
  onClickSignIn(): void {
    this.router.navigateByUrl('/sign_in');
  }
  onClickSignUp(): void {
    this.router.navigateByUrl('/sign_up');
  }
}
