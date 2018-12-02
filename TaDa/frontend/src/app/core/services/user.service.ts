import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Response } from '@angular/http';
import { TypeEnum } from '../models/enums/type-enum.enum';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = '/api/user/';
  private signupUrl = '/api/user/signup/';
  private loginUrl = '/api/user/signin/';
  private signoutUrl = '/api/user/signout/';

  private currentUser: User = null;

  constructor(
    private http: HttpClient
  ) { }

  /* get information about Logged-in User */
  getCurrentUser(): User {
    return this.currentUser;
  }

  isLoggedIn(): boolean {
    if (this.currentUser != null) {
      return true;
    } else {
      return false;
    }
  }
  getUserType(): TypeEnum {
    return this.currentUser.user_type;
  }

  /* http for UserService */
  signup(user: User): Promise<User> {
    return this.http.post<User>(this.signupUrl, user, httpOptions)
      .toPromise().catch(this.handleError);
  }

  signin(email: string, password: string): Promise<Response> {
    return this.http.post<Response>
              (this.loginUrl, {'email': email, 'password': password}, httpOptions)
              .toPromise().catch(this.handleError);
  }

  signout(): void {
    this.currentUser = null;
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userPassword');
    this.http.get<Response>(this.signoutUrl).toPromise().catch(this.handleError);
  }

  updateUser(user: User): Promise<User> {
    const url = `${this.userUrl}${user.id}`;
    return this.http.put(url, user, httpOptions)
      .toPromise().then(() => user);
  }

  /* set properties in*/
  setLoginUser(user: User): void {
    this.currentUser = user;
  }

  /* get User by Id */
  getUser(id: number): Promise<User> {
    const url = `${this.userUrl}${id}`;
    return this.http.get<User>(url).toPromise().catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.log('An error occurred in UserService', error);
    return Promise.reject(error.message || 'Internal server error');
  }


}
