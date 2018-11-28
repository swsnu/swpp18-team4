import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditEmployerComponent } from './user-edit-employer.component';

describe('UserEditEmployerComponent', () => {
  let component: UserEditEmployerComponent;
  let fixture: ComponentFixture<UserEditEmployerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserEditEmployerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditEmployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
