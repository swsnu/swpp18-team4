import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from "@angular/core";
import { MainComponent } from "./main.component";
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { UserService } from "../user.service";
import { LoginUserService } from "../log-in-user.service";
import {FormsModule} from "@angular/forms";

@Component({selector: 'app-title', template: ''})
class TitleStubComponent {}

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainComponent,  TitleStubComponent ],
      imports: [ RouterTestingModule, HttpClientTestingModule],
      providers: [
        { provide: Router, useValue: routerSpy },
        UserService,
        LoginUserService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.get(Router);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('click arbeitbulletin testing', () => {
    component.onClickArbeitBulletin();
    const spy = router.navigateByUrl as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];
    expect(navArgs).toBe('/arbeit', 'redirect : arbeit');
  });
});

