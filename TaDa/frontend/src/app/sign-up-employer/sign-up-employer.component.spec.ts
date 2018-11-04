import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpEmployerComponent } from './sign-up-employer.component';

describe('SignUpEmployerComponent', () => {
  let component: SignUpEmployerComponent;
  let fixture: ComponentFixture<SignUpEmployerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpEmployerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpEmployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
