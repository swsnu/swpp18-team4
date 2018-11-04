import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpEmployeeComponent } from './sign-up-employee.component';

describe('SignUpEmployeeComponent', () => {
  let component: SignUpEmployeeComponent;
  let fixture: ComponentFixture<SignUpEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
