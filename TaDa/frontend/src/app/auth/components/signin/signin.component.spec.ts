import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Router, ActivatedRoute } from '@angular/router';
import { SigninComponent } from './signin.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../../core/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { TalkService } from 'src/app/core/services/talk.service';

import { Response, ResponseOptions } from '@angular/http';
import { mock_users } from '../../../shared/mock/mock-user';
import { ToastrService } from 'ngx-toastr';
/*
private talkService: TalkService,
private route: ActivatedRoute,
private toastrService: ToastrService
*/


describe('SigninComponent', () => {
  let component: SigninComponent;
  let fixture: ComponentFixture<SigninComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let talkServiceSpy: jasmine.SpyObj<TalkService>;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;

  beforeEach(async(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    talkServiceSpy = jasmine.createSpyObj('TalkService',
      [
        'createCurrentSession',
        'createTalkUser',
        'createPopup',
        'createChatbox',
        'createInbox',
        'destroyAllLoadedPopups'
      ]
    );
    toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['warning']);
    const userSpy = jasmine.createSpyObj('UserService', ['createToken','checkCSRF', 'isLoggedIn', 'signin', 'getUser', 'setLoginUser']);
    TestBed.configureTestingModule({
      declarations: [ SigninComponent ],
      imports: [
        RouterTestingModule,
        HttpClientModule,
        FormsModule
      ],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: TalkService, useValue: talkServiceSpy },
        { provide: ActivatedRoute, useValue: {
          queryParams: of({redirectTo: ''})
        } },
        { provide: ToastrService, useValue: toastrServiceSpy },
        { provide: UserService, useValue: userSpy }
      ]
    })
    .compileComponents();
    userServiceSpy = TestBed.get(UserService);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SigninComponent);
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

    userServiceSpy.getUser.and.returnValue(of(mock_users[0]).toPromise());

    await component.onClickSignIn();

    expect(userServiceSpy.signin.calls.count()).toEqual(1);
    expect(userServiceSpy.getUser.calls.count()).toEqual(1);

    const spy = routerSpy.navigateByUrl;
    
  //  const navArgs = spy.calls.first().args[0];
  //  expect(navArgs).toBe('/');
  });

  it('user fails in signin', async() => {
    userServiceSpy.isLoggedIn.and.returnValue(false);
    userServiceSpy.signin.and.returnValue(new Promise(function(resolve, reject) {
        reject(new HttpErrorResponse({status: 501}));
      }));

    await component.onClickSignIn();
    expect(userServiceSpy.signin.calls.count()).toEqual(1);
    expect(userServiceSpy.getUser.calls.count()).toEqual(0);
    fixture.detectChanges();
    expect(toastrServiceSpy.warning.calls.count()).toEqual(1);

  //  fixture.whenStable().then(() => {
  //    expect(window.alert).toHaveBeenCalled();
  //  });
  });

});
