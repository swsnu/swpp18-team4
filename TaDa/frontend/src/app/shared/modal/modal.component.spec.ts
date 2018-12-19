import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbdModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: NgbdModalComponent;
  let fixture: ComponentFixture<NgbdModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgbdModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgbdModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
