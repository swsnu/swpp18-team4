import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbeitPostPreviewComponent } from './arbeit-post-preview.component';

describe('ArbeitPostPreviewComponent', () => {
  let component: ArbeitPostPreviewComponent;
  let fixture: ComponentFixture<ArbeitPostPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArbeitPostPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArbeitPostPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
