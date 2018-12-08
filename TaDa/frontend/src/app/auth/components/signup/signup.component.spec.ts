import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { SignupComponent } from './signup.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../../core/services/user.service';
import { User } from '../../../core/models/user';
import { HttpErrorResponse } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Response, ResponseOptions } from '@angular/http';
import { ToastrService, ToastrModule } from 'ngx-toastr';


describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(async(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    const userSpy = jasmine.createSpyObj('UserService', ['createToken','checkCSRF', 'isLoggedIn', 
      'signup', 'checkDuplicateEmail', 'checkDuplicateNickname','sendEmail']);
    const toastrSpy = jasmine.createSpyObj('ToastrService', ['warning']);

    TestBed.configureTestingModule({
      declarations: [ SignupComponent ],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        FormsModule,
        ToastrModule.forRoot()
      ],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: UserService, useValue: userSpy },
        { provide: ToastrService, useValue: toastrSpy },

      ]
    })
    .compileComponents();
    userServiceSpy = TestBed.get(UserService);
    toastrServiceSpy = TestBed.get(ToastrService);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userServiceSpy.checkCSRF.and.returnValue('asdf');
    userServiceSpy.createToken.and.returnValue(new Promise(function(resolve, reject) {
      resolve(new Response(
        new ResponseOptions({ body: {'result' : true}})
        ));
    }));    

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test invalid email checkDuplicateEmail', async() => {
    component.signup_user.email ='chjeong';
    await component.onClickcheckDuplicateEmail();
    expect(toastrServiceSpy.warning.calls.count()).toEqual(1);
  });
 
  /*
  it('test duplicate email checkDuplicateEmail', async() => {
    component.signup_user.email ='chjeong@snu.ac.kr';
    userServiceSpy.checkDuplicateEmail.and.returnValue(new Promise(function(resolve, reject) {
      resolve(new Response(
        new ResponseOptions({ body: {'isUnique' : false}})
        ));
    })); 
    await component.onClickcheckDuplicateEmail();
    expect(toastrServiceSpy.warning.calls.count()).toEqual(1);
  });

  it('test checkDuplicateEmail success', async() => {
    component.check_email = false;
    component.signup_user.email ='chjeong@snu.ac.kr';
    userServiceSpy.checkDuplicateEmail.and.returnValue(new Promise(function(resolve, reject) {
      resolve(new Response(
        new ResponseOptions({ body: {'isUnique' : true}})
        ));
    })); 
    await component.onClickcheckDuplicateEmail();
    expect(component.check_email).toBe(true);
  }); */

  

  it('test validateEmail', () => {
    component.signup_user.email ='chjeong@snu.ac.kr';
    expect(component.validateEmail()).toBe(true);
    component.signup_user.email ='chjeong@com';
    expect(component.validateEmail()).toBe(false);
  });

  it('test validatePassword', () => {
    component.signup_user.password ='chjeong@snu.ac.kr';
    expect(component.validatePassword()).toBe(false);
    component.signup_user.password ='123  22';
    expect(component.validatePassword()).toBe(false);
    component.signup_user.password ='123chJeong';
    expect(component.validatePassword()).toBe(true);
  });

  it('test validateNickname', () => {
    component.signup_user.nickname ='  ab';
    expect(component.validatePassword()).toBe(false);
    component.signup_user.password ='123chJeong';
    expect(component.validatePassword()).toBe(true);
  });

  it('test buildErrMsg', () => {
    component.as_employer = false;
    component.check_email = false;
    component.check_nickname = false;
    component.check_password = true;
    component.check_license = false;
    expect(component.build_errmsg().length).toBe(2);
    component.check_nickname = true;
    expect(component.build_errmsg().length).toBe(1);
  }); 

});
