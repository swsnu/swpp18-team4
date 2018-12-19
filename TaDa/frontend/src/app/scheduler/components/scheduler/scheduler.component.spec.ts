import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulerComponent } from './scheduler.component';
import { NgbModule, NgbDatepicker } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { ToastrService } from 'ngx-toastr';
import { RouterTestingModule } from '@angular/router/testing';
import { PostService } from 'src/app/core/services/post.service';
import { mock_posts, mock_posts_for_scheduler } from '../../../shared/mock/mock-post';
import { schResult } from '../../../core/models/schclass';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { of, Observable } from 'rxjs';

describe('SchedulerComponent', () => {
  let component: SchedulerComponent;
  let fixture: ComponentFixture<SchedulerComponent>;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;
  let postServiceSpy: jasmine.SpyObj<PostService>;

  beforeEach(async(() => {
    toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['warning']);
    postServiceSpy = jasmine.createSpyObj('PostService', ['getPosts']);
    TestBed.configureTestingModule({
      declarations: [ SchedulerComponent ],
      imports: [
        RouterTestingModule,
        NgbModule.forRoot(),
        FormsModule,
        AgmCoreModule.forRoot({
          apiKey: 'AIzaSyCYOybP6ZEj4V4tWM8367t_EKIXVHD4ado'
        })
      ],
      providers: [
        { provide: ToastrService, useValue: toastrServiceSpy },
        { provide: PostService, useValue: postServiceSpy }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('input wrong input', () => {
    component.start_time_input = new NgbDate(2018, 11, 19);
    component.end_time_input = new NgbDate(2018, 11, 18);
    component.time_zone_hm = [0, 0, 0, 0];
    component.onClickSearchButton();
    expect(toastrServiceSpy.warning.calls.count()).toEqual(1);
  });

  it('input correct input', () => {
    component.start_time_input = new NgbDate(2018, 12, 19);
    component.end_time_input = new NgbDate(2018, 12, 20);
    component.time_zone_hm = [0, 0, 0, 0];
    postServiceSpy.getPosts.and.returnValue(of(mock_posts_for_scheduler).toPromise());
    
    component.onClickSearchButton();

    expect(toastrServiceSpy.warning.calls.count()).toEqual(0);
  });

  it('other function test', () => {
    expect(component.iter(20).length).toEqual(20);
    expect(component.iter_minute(20).length).toEqual(4);
  });
});
