import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeblockComponent } from './timeblock.component';

describe('TimeblockComponent', () => {
  let component: TimeblockComponent;
  let fixture: ComponentFixture<TimeblockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeblockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeblockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
