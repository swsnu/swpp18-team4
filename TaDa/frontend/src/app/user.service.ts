import { Injectable } from '@angular/core';
import { Employee, Employer, User} from './Classes/User';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
  ) { }
  private user_url = 'user/user/';

  getUser(user: User | number): Promise<User> {
    const id = (typeof user === 'number') ? user : user.id;
    const url = `${this.user_url}${id}`;
    return this.http.get<User>(url).toPromise();
  }

  getEmployer(user: User | number): Promise<Employer> {
    const id = (typeof user === 'number') ? user : user.id;
    const url = `${'user/employer/'}${id}`;
    return this.http.get<Employer>(url).toPromise();
  }

  getEmployee(user: User | number): Promise<Employee> {
    const id = (typeof user === 'number') ? user : user.id;
    const url = `${'user/employer/'}${id}`;
    return this.http.get<Employee>(url).toPromise();
  }

  updateEmployee(employee: Employee) {
    const url = `${'user/employee/'}${employee.id}`;
    return this.http.put(url, employee, httpOptions)
      .toPromise()
      .then(() => employee);
  }

  updateEmployer(employer: Employer) {
    const url = `${'user/employer/'}${employer.id}`;
    return this.http.put(url, employer, httpOptions)
      .toPromise()
      .then(() => employer);
  }

  updateUser(user: User) {
    const url = `${this.user_url}${user.id}`;
    return this.http.put(url, user, httpOptions)
    .toPromise()
    .then(() => user);

  }

}
