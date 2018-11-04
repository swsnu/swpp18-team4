import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginUserService } from '../log-in-user.service';
import { RouterTestingModule } from '@angular/router/testing';

import { TitleComponent } from './title.component';
import { Router } from '@angular/router';

describe('TitleComponent', () => {
  let component: TitleComponent;
  let fixture: ComponentFixture<TitleComponent>;
  let router: Router;
  let loginUserService: LoginUserService;

  beforeEach(async(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    TestBed.configureTestingModule({
      declarations: [ TitleComponent ],
      imports: [ RouterTestingModule ],
      providers: [
        LoginUserService,
        { provide: Router, useValue: routerSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router);
    loginUserService = TestBed.get(LoginUserService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('log in testing', () => {
    expect(component.isLoggedIn()).toBeFalsy();
  });

  it('sign in testing', () => {
    component.onClickSignIn();
    const spy = router.navigateByUrl as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];
    expect(navArgs).toBe('/sign_in', 'sign in redirect : /sign_in');
  });

  it('sign up testing', () => {
    component.onClickSignUp();
    const spy = router.navigateByUrl as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];
    expect(navArgs).toBe('/sign_up', 'sign up redirect : /sign_up');
  });

  it('click title image testing', () => {
    component.onClickTitleImage();
    const spy = router.navigateByUrl as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];
    expect(navArgs).toBe('', 'redirect : ');
  });

  it('click my page : employer', () => {
    spyOn(loginUserService, 'getUserType').and.callFake(() => 'Employer');
    component.onClickMyPage();
    const spy = router.navigateByUrl as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];
    expect(navArgs).toBe('/employer_mypage', 'redirect : /employer_mypage');
  });

  it('click my page : employee', () => {
    spyOn(loginUserService, 'getUserType').and.callFake(() => 'Employee');
    component.onClickMyPage();
    const spy = router.navigateByUrl as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];
    expect(navArgs).toBe('/employee_mypage', 'redirect : /employee_mypage');
  });
});
