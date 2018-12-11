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
  private tokenUrl = '/api/user/token/';
  private signupUrl = '/api/user/signup/';
  private loginUrl = '/api/user/signin/';
  private signoutUrl = '/api/user/signout/';
  private emailUrl = '/api/user/email/';
  private nicknameUrl = '/api/user/nickname/';

  private currentUser: User = null;

  constructor(
    private http: HttpClient,
  ) { 
    /*
      let obj = JSON.parse(sessionStorage.getItem('user'));
      
      if (obj != null) {
        this.setLoginUser(obj);
      }
      */
  }

  /* create token for user with no token */
  createToken() : Promise<Response> {
    return this.http.get<Response>(this.tokenUrl).toPromise().catch(this.handleError);
  }  

  /* Check cookie if token contained. If there's no token, return null */
  checkCSRF() : string {
    const lines = document.cookie.split(';');
    let result: string = null; 
    lines.forEach(line => {
      if (line.match(/csrftoken/)) {
        result =  line.trim().split('=')[1];
      }
    });
    return result;
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

  isActivate(): boolean {
    if (this.currentUser != null && this.currentUser.is_active == true) {
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
  signup(user: Partial<User>): Promise<Response> {
    return this.http.post<User>(this.signupUrl, user, httpOptions)
      .toPromise().catch(this.handleError);
  }

  signin(email: string, password: string): Promise<Response> {
    return this.http.post<Response>
              (this.loginUrl, {'email': email, 'password': password}, httpOptions)
              .toPromise().catch(this.handleError);
  }

  signout(): void {
    this.http.get<Response>(this.signoutUrl).toPromise().catch(this.handleError);
    this.currentUser = null;

  }

  updateUser(user: User): Promise<User> {
    const url = `${this.userUrl}${user.id}/`;
    return this.http.put(url, user, httpOptions)
      .toPromise().then(() => user);
  }

  /* When signUp, check if fields are unique or not*/
  checkDuplicateEmail(email: string) {
    const url = `${this.emailUrl}${email}/`;
    return this.http.get<Response>(url).toPromise().catch(this.handleError);
  }

  checkDuplicateNickname(nickname: string) {
    const url = `${this.nicknameUrl}${nickname}/`;
    return this.http.get<Response>(url).toPromise().catch(this.handleError);
  }

  /* Send email to authenticate when SignUp */
  sendEmail(user: User): Promise<Response> {
    const url = `api/user/sendemail/${user.email}/`;
    return this.http.post<Response>(url, httpOptions).toPromise();
  }

  /* After email verification, alter 'is_active' column in User table */
  verificate(uidb64: string, token: string): Promise<Response> {
    const url = `api/user/activate/${uidb64}/${token}/`;
    return this.http.get<Response>(url).toPromise().catch(this.handleError);
  }

  /* get User by Id */
  getUser(id: number): Promise<User> {
    const url = `${this.userUrl}${id}/`;
    return this.http.get<User>(url).toPromise().catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.log('An error occurred in UserService', error);
    return Promise.reject(error.message || 'Internal server error');
  }

}
