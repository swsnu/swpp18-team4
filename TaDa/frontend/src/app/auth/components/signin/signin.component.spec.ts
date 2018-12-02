import { async, tick, ComponentFixture, TestBed } from '@angular/core/testing';

import { Router } from '@angular/router';
import { SigninComponent } from './signin.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user';
import { HttpErrorResponse } from '@angular/common/http';
import { of, Observable } from 'rxjs';

import { Response, ResponseOptions } from '@angular/http';
import { TypeEnum } from 'src/app/core/models/enums/type-enum.enum';

const mock_user = {
  id: 1,
  user_type: TypeEnum.EE,
  email: 'ch@snu.ac.kr',
  password: 'abc',
  nickname: 'blu',
  employee_region: null,
  employee_type: null,
  employee_how_to_pay: null,
  employee_pay_limit: 10000,
  company_name: null,
  company_address: null,
  business_content: null,
  representative_name: null,
  employer_license_number: null,
  profile_image: null, // modify
  is_admin: false,
  is_active: false
};


describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(async(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    const userSpy = jasmine.createSpyObj('UserService', ['isLoggedIn', 'signin', 'getUser', 'setLoginUser']);
    TestBed.configureTestingModule({
      declarations: [ SigninComponent ],
      imports: [
        RouterTestingModule,
        HttpClientModule
      ],
      providers: [
        {provide: Router, useValue: routerSpy},
        {provide: UserService, useValue: userSpy}
      ]
    })
    .compileComponents();
    userServiceSpy = TestBed.get(UserService);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('if already signed in, should redirect to home', () => {
    userServiceSpy.isLoggedIn.and.returnValue(true);
    component.ngOnInit();
    const spy = routerSpy.navigateByUrl;
    const navArgs = spy.calls.first().args[0];
    expect(navArgs).toBe('/');
  });

  it('user clicks sign up button', () => {
    component.onClickSignUp();
    const spy = routerSpy.navigateByUrl;
    const navArgs = spy.calls.first().args[0];
    expect(navArgs).toBe('signup');
  });

  it('user succeeds in signin', async() => {
    userServiceSpy.isLoggedIn.and.returnValue(false);
    userServiceSpy.signin.and.returnValue(new Promise(function(resolve, reject) {
      resolve(new Response(
        new ResponseOptions({ body: {'id' : 1}})
        ));
    }));

    userServiceSpy.getUser.and.returnValue(of(mock_user).toPromise());

    await component.onClickSignIn();

    expect(userServiceSpy.signin.calls.count()).toEqual(1);
    expect(userServiceSpy.getUser.calls.count()).toEqual(1);

    const spy = routerSpy.navigateByUrl;
    const navArgs = spy.calls.first().args[0];
    expect(navArgs).toBe('/');
  });

  it('user fails in signin', async() => {
    userServiceSpy.isLoggedIn.and.returnValue(false);
    userServiceSpy.signin.and.returnValue(new Promise(function(resolve, reject) {
        reject(new HttpErrorResponse({status: 501}));
      }));
    spyOn(window, 'alert');

    await component.onClickSignIn();
    expect(userServiceSpy.signin.calls.count()).toEqual(1);
    expect(userServiceSpy.getUser.calls.count()).toEqual(0);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(window.alert).toHaveBeenCalled();
    });
    //expect(window.alert).toHaveBeenCalledWith('Login failed!');
  });

});
