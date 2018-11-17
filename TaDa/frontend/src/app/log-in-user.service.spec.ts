import {TestBed} from '@angular/core/testing';
import {User} from "./Classes/User";
import {LoginUserService} from './log-in-user.service';
import {UserTypeEnum} from "./Enums/UserTypeEnum";

describe('LogInUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));


  it('should be created', () => {
    const service: LoginUserService = TestBed.get(LoginUserService);
    expect(service).toBeTruthy();
  });

  it('test isLogedIn func', () => {
    const service: LoginUserService = TestBed.get(LoginUserService);
    expect(service.isLoggedIn()).toBeFalsy();
    service.LogInUser = new User;
    expect(service.isLoggedIn()).toBeTruthy();
  });

  it('test  getUserType func', () => {
    const service: LoginUserService = TestBed.get(LoginUserService);
    const mockuser = <User>{id: 1, type: UserTypeEnum.Employer, email: "a@gmail.com", password: "a", name: "a"};
    expect(service.getUserType()).toEqual(null);
    service.LogInUser = mockuser;
    expect(service.isLoggedIn()).toBeTruthy();
    service.LogInUser.type = UserTypeEnum.Employee;
    expect(service.getUserType()).toEqual('Employee');
    service.LogInUser.type = UserTypeEnum.Employer;
    expect(service.getUserType()).toEqual('Employer');

  });

  it('test signOut func', () => {
    const service: LoginUserService = TestBed.get(LoginUserService);
    service.signOut();
  });
});
