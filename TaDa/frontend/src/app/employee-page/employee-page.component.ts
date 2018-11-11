import { Component, OnInit } from '@angular/core';
import { User, Employee } from '../User';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginUserService } from '../log-in-user.service';
import { UserService } from '../user.service';
import { UserTypeEnum } from '../Enums/UserTypeEnum';
import { ArbeitTypeEnum } from '../Enums/ArbeitTypeEnum';
import { ArbeitRegionEnum } from '../Enums/ArbeitRegionEnum';


@Component({
  selector: 'app-employee-page',
  templateUrl: './employee-page.component.html',
  styleUrls: ['./employee-page.component.css']
})

export class EmployeePageComponent implements OnInit {
  user: User;
  employee: Employee;
  pw: string;
  pw_confirm: string;

  ex_user = {
    email: 'chjeong9727@snu.ac.kr',
    name: 'Chaehyun', 
    password: '111222333',
    id: 1,
    type: UserTypeEnum.Employee
  };

  ex_employee = {
    id: 1,
    arbeit_region: [ArbeitRegionEnum.School, ArbeitRegionEnum.Nakdae],
    arbeit_type: [ArbeitTypeEnum.IT, ArbeitTypeEnum.Design],
    timezone: ['Mon 13:00', 'Wed 17:30']
  }



  constructor(
    private loginService: LoginUserService,
    private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    //this.user = this.loginService.getLogInUser();
    //this.employee = this.loginService.getEmployee();
    this.user = this.ex_user;
    this.employee = this.ex_employee;
  }

  editUserInfo(): void {
    if (confirm('Really want to save?') === false) {
      return;
    }
    this.userService.updateEmployee(this.employee)
      .then(employee => this.router.navigateByUrl(`employee_page`));
  }


  editPassword(): void {
    if (this.pw === '' ) {
      alert('fill the password');
    } else if (confirm('Really want to change passsword?') === false) {
      return;
    }

    //TODO: check validity of password
    if (this.pw !== this.pw_confirm) {
      alert('Check password again');
    } else {
        this.user.password = this.pw;
        this.userService.updateUser(this.user)
          .then(employee => this.router.navigateByUrl(`employee_page`));
    }
}


  goBack(): void {
      if (confirm('Are you sure? The change will be lost.') === false) {
        return;
      }
      this.router.navigateByUrl(`employee_page`);
  }
}
