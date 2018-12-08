import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupMailComponent } from './signup-mail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from '../../../core/services/user.service';
import { Router, ActivatedRoute, convertToParamMap } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

/*
class MockUserService extends UserService {
  verificate(id, token) : {
    return Promise.resolve({'successed': true, 'message': 'Congratulation'});
  }
}*/


describe('SignupMailComponent', () => {
  let component: SignupMailComponent;
  let fixture: ComponentFixture<SignupMailComponent>;
  let routerSpy: jasmine.SpyObj<Router>;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  beforeEach(async(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    const userSpy = jasmine.createSpyObj('UserService', ['verificate']);
    TestBed.configureTestingModule({
      declarations: [ SignupMailComponent ],
      imports: [
        RouterTestingModule,
        HttpClientModule,
      ],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: UserService, useValue: userSpy },
        { provide: ActivatedRoute, useValue:
          { snapshot:
              { paramMap: convertToParamMap ({
                  id: '1',
                  token: 'tokentoken123'
                })
               }
          }}
      ]
    })
    .compileComponents();
    userServiceSpy = TestBed.get(UserService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    userServiceSpy.verificate.and.returnValue(
      Promise.resolve({'successed': true, 'message': 'Congratulation'})
  )};

  /*
  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('user clicks sign up button', () => {
    component.onClickSignUp();
    const spy = routerSpy.navigateByUrl;
    const navArgs = spy.calls.first().args[0];
    expect(navArgs).toBe('signup');
  });

  it('user clicks sign in button', () => {
    component.onClickSignIn();
    const spy = routerSpy.navigateByUrl;
    const navArgs = spy.calls.first().args[0];
    expect(navArgs).toBe('signin');
  });*/
});
