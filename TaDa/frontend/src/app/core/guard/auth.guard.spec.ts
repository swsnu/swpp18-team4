import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { UserService } from '../services/user.service';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

class mockState implements RouterStateSnapshot {
  url: string;
  toString() {
    return this.url;
  };
  root = null;
}


describe('AuthGuard', () => {
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;
  let guard: AuthGuard;
  beforeEach(() => {    
    const userSpy = jasmine.createSpyObj('UserService', ['isLoggedIn']);
    const toastrSpy = jasmine.createSpyObj('ToastrService', ['warning']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: UserService, useValue: userSpy },
        { provide: ToastrService, useValue: toastrSpy },
      ],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        ToastrModule.forRoot()
      ]
    }).compileComponents();
    userServiceSpy = TestBed.get(UserService); 
    toastrServiceSpy = TestBed.get(ToastrService);
    guard = TestBed.get(AuthGuard);
  });

  it('should create guard', inject([AuthGuard], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));

  it('test canActivate when logged-in', inject([AuthGuard], (guard: AuthGuard) => {
    userServiceSpy.isLoggedIn.and.returnValue(true);
    expect(guard.canActivate(null, null)).toBe(true);
  }));


  it('test canActivate when not logged-in', inject([AuthGuard], (guard: AuthGuard) => {
    userServiceSpy.isLoggedIn.and.returnValue(false);
    const arg = new mockState();
    arg.url = '/post/detail/3';
    guard.canActivate(null, arg);
    expect(toastrServiceSpy.warning.calls.count()).toEqual(1);
  }));
});
