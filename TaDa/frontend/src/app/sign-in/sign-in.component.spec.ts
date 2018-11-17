import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from "@angular/platform-browser";
import { SignInComponent } from './sign-in.component';
import {Router} from "@angular/router";
import {UserService} from "../user.service";
import {LoginUserService} from "../log-in-user.service";

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignInComponent ],
      providers: [
        { provide: Router, useValue: routerSpy },
        LoginUserService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test onclickSignIn func', async(() => {
    spyOn(window, "alert");
    component.onclickSignIn();
    expect(window.alert).toHaveBeenCalledWith('Login Failed:\n- Email must contain @ and .\n- Password must contain at least one number and one letter, and at least 8 characters\n');

    let input = fixture.debugElement.query(By.css('#email'));
    let el = input.nativeElement;
    console.log(document.forms["form"]["email"].value);
    expect(el.value).toBe('');
    el.value = 'jyp930@gmail.com';
    console.log(document.forms["form"]["email"].value);
    el.dispatchEvent(new Event('input'));
    fixture.whenStable().then(() => {
      fixture.detectChanges();

      console.log(document.forms["form"]["email"].value);
    });
    component.onclickSignIn();
    expect(window.alert).toHaveBeenCalledWith('Login Failed:\n- Email must contain @ and .\n- Password must contain at least one number and one letter, and at least 8 characters\n');

  }));
});
