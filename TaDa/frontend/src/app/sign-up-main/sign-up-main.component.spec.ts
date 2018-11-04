import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignUpMainComponent } from './sign-up-main.component';

describe('SignUpMainComponent', () => {
  let component: SignUpMainComponent;
  let fixture: ComponentFixture<SignUpMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignUpMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
