import { TestBed } from '@angular/core/testing';
import { User } from "./User";
import { LoginUserService } from './log-in-user.service';

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
    
  });
});
