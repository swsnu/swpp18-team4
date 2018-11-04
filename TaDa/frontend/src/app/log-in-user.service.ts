import { Injectable } from '@angular/core';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class LoginUserService {
  LogInUser: User;
  constructor() { }

  isValidUser() {}

  isLogIned(): boolean {
    return this.LogInUser != null;
  }

  getUserType(): string {
    // TODO : implement with django backend
    return this.LogInUser ? this.LogInUser.type : '';
  }

  signOut(): void {
    // TODO : connect with django backend
    this.LogInUser = null;
  }

}
