import {Injectable} from '@angular/core';
import {User} from './User';
import {UserTypeEnum} from './Enums/UserTypeEnum';

@Injectable({
  providedIn: 'root'
})
export class LoginUserService {
  LogInUser: User;
  constructor() { }

  getLogInUser(): User {
    if (this.LogInUser != null) {
      return this.LogInUser;
    } else {
      return null;
    }
  }

  isValidUser() {}


  getUserType(): string {
    if (this.LogInUser) {
      if (this.LogInUser.type === UserTypeEnum.Employee) {
        return 'Employee';
      } else {
        return 'Employer';
      }
    } else {
      return '';
    }
  }

  signOut(): void {
    // TODO : connect with django backend
    this.LogInUser = null;
  }

}
