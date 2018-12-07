import { TestBed, async } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClientModule } from '@angular/common/http';
import { User } from '../models/user';
import {TypeEnum} from '../models/enums/type-enum.enum';
import {Router} from '@angular/router';
import {Response, ResponseOptions} from '@angular/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';

const mock_user: User = {
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

describe('UserService', () => {
  const userUrl = '/api/user/';
  const tokenUrl = '/api/user/token';
  const signupUrl = '/api/user/signup/';
  const loginUrl = '/api/user/signin/';
  const signoutUrl = '/api/user/signout/';

  let userServiceSpy: jasmine.SpyObj<UserService>;
  let userService: UserService;
  beforeEach(() => {
    //const userSpy = jasmine.createSpyObj('UserService', ['isLoggedIn', 'signin', 'getUser', 'setLoginUser']);

    TestBed.configureTestingModule({
      declarations: [],
      imports: [
        HttpClientModule,
        HttpClientTestingModule,
      ],
      providers: [
        UserService,
        //{provide: UserService, useValue: userSpy}
      ]
    });
    userServiceSpy = TestBed.get(UserService);
    userService = TestBed.get(UserService);
  });

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

  it('test createToken func', () => {
    userService.createToken()
      .then(res => expect(res).toBeTruthy());
  });

  it('test checkCSRF func fail', async() => {
    let cookie: string = 'my-cookie=cookievalue;date=20181212;';    
    let result: string = '';
    spyOnProperty(document, 'cookie', 'get').and.returnValue(cookie);
    expect(userService.checkCSRF()).toBe(null);
  });


  it('test checkCSRF func success', async() => {
    let cookie: string = 'my-cookie=cookievalue;csrftoken=ABCD123;date=20181212;';
    let result: string = '';
    spyOnProperty(document, 'cookie', 'get').and.returnValue(cookie);
    await expect(userService.checkCSRF()).toEqual('ABCD123');
  });

  it('test signup func', () => {
    userService.signup(mock_user)
      .then(user => expect(user.id).toEqual(1));
  });

  it('test signin func', () => {
    userService.signin(mock_user.email, mock_user.password)
      .then(res => expect(res).toBeTruthy());
  });


});
