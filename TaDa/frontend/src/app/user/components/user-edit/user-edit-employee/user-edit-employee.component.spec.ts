import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditEmployeeComponent } from './user-edit-employee.component';

describe('UserEditEmployeeComponent', () => {
  let component: UserEditEmployeeComponent;
  let fixture: ComponentFixture<UserEditEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserEditEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
