import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpMainComponent } from './sign-up-main.component';
import {Router} from "@angular/router";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('SignUpMainComponent', () => {
  let component: SignUpMainComponent;
  let fixture: ComponentFixture<SignUpMainComponent>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpMainComponent ],
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        { provide: Router, useValue: routerSpy },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
