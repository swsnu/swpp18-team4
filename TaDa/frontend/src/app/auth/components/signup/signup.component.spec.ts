import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { SignupComponent } from './signup.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../../core/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { Response, ResponseOptions } from '@angular/http';
import { ToastrService, ToastrModule } from 'ngx-toastr';
import { mock_users } from '../../../shared/mock/mock-user';


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
    const toastrSpy = jasmine.createSpyObj('ToastrService', ['warning', 'success']);

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
 
  
  it('test duplicate email checkDuplicateEmail', async() => {
    component.signup_user.email ='chjeong@snu.ac.kr';
    userServiceSpy.checkDuplicateEmail.and.returnValue(
      Promise.resolve({'isUnique': false}
    )); 
    await component.onClickcheckDuplicateEmail();
    expect(toastrServiceSpy.warning.calls.count()).toEqual(1);
  });

  it('test checkDuplicateEmail success', async() => {
    component.check_email = false;
    component.signup_user.email ='chjeong@snu.ac.kr';
    userServiceSpy.checkDuplicateEmail.and.returnValue(
      Promise.resolve({'isUnique': true}
    )); 
    await component.onClickcheckDuplicateEmail();
    expect(component.check_email).toBe(true);
  });

  it('test invalid nickname checkDuplicateNickname', async() => {
    component.signup_user.nickname ='  1';
    await component.onClickcheckDuplicateNickname();
    expect(toastrServiceSpy.warning.calls.count()).toEqual(1);
  });
 
  
  it('test duplicate nickname checkDuplicateNickname', async() => {
    component.signup_user.nickname = 'Nick';
    userServiceSpy.checkDuplicateNickname.and.returnValue(
      Promise.resolve({'isUnique': false}
    )); 
    await component.onClickcheckDuplicateNickname();
    expect(toastrServiceSpy.warning.calls.count()).toEqual(1);
  });

  it('test checkDuplicateNickname success', async() => {
    component.check_nickname = false;
    component.signup_user.nickname ='Nickname';
    userServiceSpy.checkDuplicateNickname.and.returnValue(
      Promise.resolve({'isUnique': true}
    )); 
    await component.onClickcheckDuplicateNickname();
    expect(component.check_nickname).toBe(true);
  });

  it('test sign up fail with invalid input', async() => {
    component.as_employee = false;
    component.signup_user.password = '123ABCabc';
    component.signup_user.company_name = 'mycompany';
    component.password_confirm = '123ABCabc';
    component.check_email = false;
    component.check_nickname = false;

    await component.onClickConfirm();
    expect(toastrServiceSpy.warning.calls.count()).toEqual(1);
  });

  it('test sign up success', async() => {
    component.as_employee = false;
    component.signup_user.password = '123ABCabc';
    component.signup_user.company_name = 'mycompany';
    component.password_confirm = '123ABCabc';
    component.check_email = true;
    component.check_nickname = true;
    userServiceSpy.signup.and.returnValue(of(mock_users[0]).toPromise());
    userServiceSpy.sendEmail.and.returnValue(
      Promise.resolve({'isUnique': false}
    ));
    await component.onClickConfirm();
    expect(userServiceSpy.signup.calls.count()).toEqual(1);
    expect(userServiceSpy.sendEmail.calls.count()).toEqual(0);
    expect(toastrServiceSpy.success.calls.count()).toEqual(1);
  //  fixture.detectChanges();
  //  fixture.whenStable().then(() => {
  //    expect(window.alert).toHaveBeenCalled();
  //  });
  });  

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
    component.as_employee = false;
    component.signup_user.company_name = '';
    component.check_email = false;
    component.check_nickname = false;
    component.check_password = true;
    expect(component.build_errmsg().length).toBe(1);
    component.check_nickname = true;
    expect(component.build_errmsg().length).toBe(1);
  }); 

});
