import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailEmployerComponent } from './user-detail-employer.component';

describe('UserDetailEmployerComponent', () => {
  let component: UserDetailEmployerComponent;
  let fixture: ComponentFixture<UserDetailEmployerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDetailEmployerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailEmployerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

//  it('should create', () => {
//    expect(component).toBeTruthy();
//  });
});
