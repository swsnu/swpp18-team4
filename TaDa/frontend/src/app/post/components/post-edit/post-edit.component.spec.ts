import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PostEditComponent } from './post-edit.component';
import { FormsModule} from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { NgbDatepickerModule, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../core/services/user.service';
import { TalkService } from '../../../core/services/talk.service';
import {RegionEnum} from '../../../core/models/enums/region-enum.enum';
import {ArbeitTypeEnum} from '../../../core/models/enums/arbeit-type-enum.enum';
import {HowToPayEnum} from '../../../core/models/enums/how-to-pay-enum.enum';
import {PostService} from '../../../core/services/post.service';
import {ActivatedRoute, convertToParamMap, RouterModule} from '@angular/router';
import {of} from 'rxjs';
import {mock_posts} from '../../../shared/mock/mock-post';
import {mock_comments} from '../../../shared/mock/mock-comment';
import {mock_users} from '../../../shared/mock/mock-user';

describe('PostEditComponent', () => {
  let component: PostEditComponent;
  let fixture: ComponentFixture<PostEditComponent>;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;
  let talkServiceSpy: jasmine.SpyObj<TalkService>;
  let modalServiceSpy: jasmine.SpyObj<NgbModal>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let postServiceSpy: jasmine.SpyObj<PostService>;

  beforeEach(async(() => {
    toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['warning', 'success']);
    userServiceSpy = jasmine.createSpyObj('UserService', ['setLoginUser', 'updateUser', 'getCurrentUser']);
    talkServiceSpy = jasmine.createSpyObj('TalkService', ['createPopup']);
    modalServiceSpy = jasmine.createSpyObj('NgbModal', ['open', 'dismissAll']);
    postServiceSpy = jasmine.createSpyObj('PostService', ['updatePosts', 'getPostByPostId']);
    TestBed.configureTestingModule({
      declarations: [ PostEditComponent ],
      imports: [
        FormsModule, RouterTestingModule, RouterModule,
        HttpClientModule, AgmCoreModule,
        NgbDatepickerModule
      ],
      providers: [
        { provide: ToastrService, useValue: toastrServiceSpy },
        { provide: UserService, useValue: userServiceSpy },
        { provide: NgbModal, useValue: modalServiceSpy },
        { provide: PostService, useValue: postServiceSpy },
        { provide: ActivatedRoute, useValue: {
            snapshot: {
              paramMap: convertToParamMap({
                id: '1'
              })
            }}},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostEditComponent);
    component = fixture.componentInstance;
    postServiceSpy = TestBed.get(PostService);
    userServiceSpy = TestBed.get(UserService);

    postServiceSpy.getPostByPostId.and.returnValue(of(mock_posts[0]).toPromise());
    fixture.detectChanges();
  });

  it('should create', () => {
    postServiceSpy.getPostByPostId.and.returnValue(of(mock_posts[0]).toPromise());
    expect(component).toBeTruthy();
  });
  it('test firstSetting func', () => {
    component.current_post = mock_posts[0];
    component.first_setting();
    expect(component.dead_line).toEqual(mock_posts[0].deadline);
    expect(component.time_zone_hm).toEqual([0, 0, 0, 0]);
  });
  it('test addToTimeZone func', () => {
    component.time_zone_list = [];
    component.current_post = mock_posts[0];
    component.time_zone_hm = [0, 0, 10, 0];
    const date_value = {year: 2019, month: 2, day: 2};
    component.addToTimezone(date_value);
    expect(component.time_zone_start).toBeNull();
    expect(component.time_zone_end).toBeNull();
    expect(component.time_zone_hm).toEqual([0, 0, 0, 0]);
  });
  it('test convertJsonToDate func', () => {
    component.current_post = mock_posts[0];
    const date_value = component.convertJsonToDate({year: 2019, month: 2, day: 1});
    component.convertJsonToDate(date_value);
    expect(date_value).toEqual(new Date(2019, 1, 1, 23, 59));
  });
  it('test edit func', () => {
    const compiled = fixture.debugElement.nativeElement;
    component.current_post = mock_posts[0];
    component.dead_line = null;
    expect(toastrServiceSpy.warning.calls.count()).toEqual(0);
  });
  it('test iter func', () => {
    const list_value = component.iter(2);
    expect(list_value).toEqual([0, 1]);
    const list_value2 = component.iter(0);
  });
  it('test remove_row func', () => {
    const date_value = new Date(1, 1, 1);
    component.time_zone_list = [date_value, date_value];
    component.remove_row(0);
    component.time_zone_list = [date_value, date_value];
  });
});
