import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailEmployeeComponent } from './user-detail-employee.component';

describe('UserDetailEmployeeComponent', () => {
  let component: UserDetailEmployeeComponent;
  let fixture: ComponentFixture<UserDetailEmployeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDetailEmployeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
