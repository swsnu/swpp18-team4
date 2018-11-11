import { Component, OnInit } from '@angular/core';
import { User, Employee } from '../User';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginUserService } from '../log-in-user.service';
import { UserService } from '../user.service';


@Component({
  selector: 'app-employee-page',
  templateUrl: './employee-page.component.html',
  styleUrls: ['./employee-page.component.css']
})

export class EmployeePageComponent implements OnInit {
  user: User;
  employee: Employee;

  constructor(
    private loginService: LoginUserService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.user = this.loginService.getLogInUser();
    this.employee = this.loginService.getEmployee();
  }

  editUserInfo(): void {
    alert('Really want to save?');
    this.userService.updateEmployee(this.employee)
      .then(employee => this.router.navigateByUrl(`/articles/${this.article.id}`));
  }

  goBack(): void {
    if (this.article.title !== this.title || this.article.content !== this.content) {
        if (confirm('Are you sure? The change will be lost.') === false) {
          return;
        }
      }
    this.router.navigateByUrl(`/articles/${this.article.id}`);
  }


}
