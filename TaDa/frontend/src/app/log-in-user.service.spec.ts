import {TestBed} from '@angular/core/testing';
import {User} from "./User";
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
    expect(service.isLogedIn()).toBeFalsy();
    service.LogInUser = new User;
    expect(service.isLogedIn()).toBeTruthy();
  });

  it('test  getUserType func', () => {
    const service: LoginUserService = TestBed.get(LoginUserService);
    expect(service.getUserType()).toEqual('');
    service.LogInUser = new User;
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
