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
import { ToastrModule } from 'ngx-toastr';


describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(async(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    const userSpy = jasmine.createSpyObj('UserService', ['createToken','checkCSRF', 'isLoggedIn', 'signup', 'checkDuplicateEmail', 
      'checkDuplicateNickname','sendEmail']);
    TestBed.configureTestingModule({
      declarations: [ SignupComponent ],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        FormsModule,
        ToastrModule.forRoot()
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


  it('test validateEmail', () => {
    component.signup_user.email ='chjeong@snu.ac.kr';
    expect(component.validateEmail()).toBe(true);
    component.signup_user.email ='chjeong@com';
    expect(component.validateEmail()).toBe(false);
  });

  it('test validatePassword', () => {
    component.signup_user.password ='chjeong@snu.ac.kr';
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
