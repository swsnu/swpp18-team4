import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbeitMainComponent } from './arbeit-main.component';
import { Component } from "@angular/core";

@Component({selector: 'router-outlet', template: ''})
class RouterOutletStubComponent { }
@Component({selector: 'app-title', template: ''})
class TitleStubComponent {}


describe('ArbeitMainComponent', () => {
  let component: ArbeitMainComponent;
  let fixture: ComponentFixture<ArbeitMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ArbeitMainComponent,
        RouterOutletStubComponent,
        TitleStubComponent,
      ]
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
