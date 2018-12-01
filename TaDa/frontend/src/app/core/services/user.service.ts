import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = '/api/user/';
  private isEmployee: boolean;
  private currentUser: User = null;

  constructor(
    private http: HttpClient
  ) { }

  signup(user: User): void {

  }

  login(email: string, password: string): void {
  }

  logout(): void {

  }

  isLoggedIn(): boolean {
    if (this.currentUser != null) {
      return true;
    } else {
      return false;
    }
  }

  getCurrentUser(): User {
    return this.currentUser;
  }

  getUser(id: number): void {
  }
}
