import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbeitMainComponent } from './arbeit-main.component';

describe('ArbeitMainComponent', () => {
  let component: ArbeitMainComponent;
  let fixture: ComponentFixture<ArbeitMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArbeitMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArbeitMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
