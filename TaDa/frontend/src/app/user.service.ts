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

  employer_list: Employer[];

  constructor(
    private http: HttpClient,
  ) { }
  private user_url = 'api/user/';

  getUser(user: User | number): Promise<User> {
    const id = (typeof user === 'number') ? user : user.id;
    const url = `${this.user_url}${id}`;
    return this.http.get<User>(url).toPromise();
  }

  getEmployerList(): void {
    const url = `api/employer/`;
    this.http.get<Employer[]>(url).subscribe(
      list => this.employer_list = list);
  }

  getEmployer(user: User | number): Promise<Employer> {
    const id = (typeof user === 'number') ? user : user.id;
    const url = `${'api/employer/'}${id}`;
    return this.http.get<Employer>(url).toPromise();
  }

  getEmployee(user: User | number): Promise<Employee> {
    const id = (typeof user === 'number') ? user : user.id;
    const url = `${'api/employer/'}${id}`;
    return this.http.get<Employee>(url).toPromise();
  }

  updateEmployee(employee: Employee) {
    const url = `${'api/employee/'}${employee.id}`;
    return this.http.put(url, employee, httpOptions)
      .toPromise()
      .then(() => employee);
  }

  updateEmployer(employer: Employer) {
    const url = `${'api/employer/'}${employer.id}`;
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
