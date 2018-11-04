import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbeitPostEditComponent } from './arbeit-post-edit.component';

describe('ArbeitPostEditComponent', () => {
  let component: ArbeitPostEditComponent;
  let fixture: ComponentFixture<ArbeitPostEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArbeitPostEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArbeitPostEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
