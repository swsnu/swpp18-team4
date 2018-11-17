import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeePageComponent } from './employee-page.component';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import {Router} from "@angular/router";
import {LoginUserService} from "../log-in-user.service";
import {RouterTestingModule} from "@angular/router/testing";

describe('EmployeePageComponent', () => {
  let component: EmployeePageComponent;
  let fixture: ComponentFixture<EmployeePageComponent>;

  beforeEach(async(() => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    let router: Router;
    let loginUserService: LoginUserService;

    TestBed.configureTestingModule({
      declarations: [ EmployeePageComponent ],
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [
        LoginUserService,
        { provide: Router, useValue: routerSpy },
      ]
    })
    .compileComponents();
    router = TestBed.get(Router);
    loginUserService = TestBed.get(LoginUserService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
