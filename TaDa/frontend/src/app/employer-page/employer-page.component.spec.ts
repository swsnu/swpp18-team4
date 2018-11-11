import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerPageComponent } from './employer-page.component';

describe('EmployerPageComponent', () => {
  let component: EmployerPageComponent;
  let fixture: ComponentFixture<EmployerPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployerPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
