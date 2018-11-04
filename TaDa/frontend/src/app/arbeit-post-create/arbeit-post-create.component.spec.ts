import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbeitPostCreateComponent } from './arbeit-post-create.component';

describe('ArbeitPostCreateComponent', () => {
  let component: ArbeitPostCreateComponent;
  let fixture: ComponentFixture<ArbeitPostCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArbeitPostCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArbeitPostCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
