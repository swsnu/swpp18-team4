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
  private tokenUrl = '/api/user/token';
  private signupUrl = '/api/user/signup';
  private loginUrl = '/api/user/signin/';
  private signoutUrl = '/api/user/signout/';

  private currentUser: User = null;

  constructor(
    private http: HttpClient
  ) { 
      if (JSON.parse(sessionStorage.getItem('storedUser'))) {
        this.currentUser = JSON.parse(sessionStorage.getItem('storedUser')) as User;
      }
  }

  /* create token for user with no token */
  createToken() : Promise<Response> {
    return this.http.get<Response>(this.tokenUrl).toPromise().catch(this.handleError);
  }  

  /* Check cookie if token contained. If there's no token, return null */
  checkCSRF() : string {
    const lines = document.cookie.split(';');
    lines.forEach(line => {
      if (line.match(/csrftoken/)) {
        console.log(line.trim().split('=')[1]);
        return line.trim().split('=')[1];
      }});
    console.log('does not end yet');
    return null;
  }

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
  
  setLoginUser(user: User): void {
      this.currentUser = user;
  }

  /* http for UserService */
  signup(user: Partial<User>): Promise<User> {
    console.log(user);
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
