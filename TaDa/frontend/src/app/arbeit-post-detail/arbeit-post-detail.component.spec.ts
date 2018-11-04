import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbeitPostDetailComponent } from './arbeit-post-detail.component';

describe('ArbeitPostDetailComponent', () => {
  let component: ArbeitPostDetailComponent;
  let fixture: ComponentFixture<ArbeitPostDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArbeitPostDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArbeitPostDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
