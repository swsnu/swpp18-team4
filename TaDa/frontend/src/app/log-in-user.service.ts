import { Injectable } from '@angular/core';
import { User, Employer, Employee } from './Classes/User';
import { UserTypeEnum } from './Enums/UserTypeEnum';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

@Injectable({
  providedIn: 'root'
})
export class LoginUserService {
  LogInUser: User;
  UserEmployer: Employer;
  UserEmployee: Employee;
  UserType: UserTypeEnum;

  constructor() { }

  isLoggedIn() {
    return this.LogInUser != null;
  }

  getLogInUser(): User {
    if (this.LogInUser != null) {
      return this.LogInUser;
    } else {
      return null;
    }
  }

  getEmployee() {
    return this.UserEmployee;
  }
  getEmployer() {
    return this.UserEmployer;
  }

  isValidUser() {}

  getUserType(): UserTypeEnum {
    if (this.LogInUser) {
      return this.UserType;
    } else {
      return null;
    }
  }

  signOut(): void {
    // TODO : connect with django backend
    this.LogInUser = null;
  }
}
