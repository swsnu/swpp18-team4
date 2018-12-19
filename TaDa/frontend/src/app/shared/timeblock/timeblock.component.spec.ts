import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeblockComponent } from './timeblock.component';
import { DragToSelectModule } from 'ngx-drag-to-select';
import { SelectContainerComponent } from 'ngx-drag-to-select';
import { DraggableCell } from '../../core/services/timeblock.service';
import { FormsModule } from '@angular/forms';

describe('TimeblockComponent', () => {
  let component: TimeblockComponent;
  let fixture: ComponentFixture<TimeblockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DragToSelectModule.forRoot(),
        FormsModule,
      ],
      declarations: [ TimeblockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeblockComponent);
    component = fixture.componentInstance;
    //spyOn(<SelectContainerComponent>component.selectContainer, 'selectItems');

    fixture.detectChanges();
  });
/*
  it('should create', () => {
    expect(component.selectContainer).toBeDefined();
    expect(component).toBeTruthy();
  });

  it('test ngAfterViewInit()', () => {
    component.ngAfterViewInit();
    //expect(component.selectContainer.selectItems).toHaveBeenCalled();
  });*/
  
});
