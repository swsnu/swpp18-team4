import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbeitBulletinComponent } from './arbeit-bulletin.component';

describe('ArbeitBulletinComponent', () => {
  let component: ArbeitBulletinComponent;
  let fixture: ComponentFixture<ArbeitBulletinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArbeitBulletinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArbeitBulletinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
