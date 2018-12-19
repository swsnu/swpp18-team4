import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {PostCreateComponent} from './post-create.component';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {HttpClientModule} from '@angular/common/http';
import {AgmCoreModule} from '@agm/core';
import {NgbDatepickerModule, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {RegionEnum} from '../../../core/models/enums/region-enum.enum';
import {invalid} from '@angular/compiler/src/render3/view/util';
import { ToastrService } from 'ngx-toastr';
import {UserService } from '../../../core/services/user.service';
import {TalkService } from '../../../core/services/talk.service';

describe('PostCreateComponent', () => {
  let component: PostCreateComponent;
  let fixture: ComponentFixture<PostCreateComponent>;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;
  let talkServiceSpy: jasmine.SpyObj<TalkService>;
  let modalServiceSpy: jasmine.SpyObj<NgbModal>;
  let userServiceSpy: jasmine.SpyObj<UserService>

  beforeEach(async(() => {
    toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['warning', 'success']);
    userServiceSpy = jasmine.createSpyObj('UserService', ['setLoginUser', 'updateUser', 'getCurrentUser']);
    talkServiceSpy = jasmine.createSpyObj('TalkService', ['createPopup']);
    modalServiceSpy = jasmine.createSpyObj('NgbModal', ['open', 'dismissAll']);
    TestBed.configureTestingModule({
      declarations: [ PostCreateComponent ],
      imports: [
        FormsModule, RouterTestingModule,
        HttpClientModule, AgmCoreModule,
        NgbDatepickerModule],
      providers: [
        { provide: ToastrService, useValue: toastrServiceSpy },
        { provide: UserService, useValue: userServiceSpy },
        { provide: NgbModal, useValue: modalServiceSpy },
        //{ provide: TalkService, useValue: talkServiceSpy },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('test getInitLatitude func', () => {
    component.new_post.region = RegionEnum.nokdu;
    const value = component.getInitLatitude();
    expect(value).toEqual(37.470526);
    component.new_post.region = RegionEnum.snu;
    const value2 = component.getInitLatitude();
    expect(value2).toEqual(37.459325);
    component.new_post.region = RegionEnum.nakdae;
    const value3 = component.getInitLatitude();
    expect(value3).toEqual(37.477002);
    component.new_post.region = RegionEnum.seoulip;
    const value4 = component.getInitLatitude();
    expect(value4).toEqual(37.481227);
  });
  it('test getInitlongitude func', () => {
    component.new_post.region = RegionEnum.nokdu;
    const value = component.getInitLongitude();
    expect(value).toEqual(126.937568);
    component.new_post.region = RegionEnum.nakdae;
    const value2 = component.getInitLongitude();
    expect(value2).toEqual(126.963758);
    component.new_post.region = RegionEnum.seoulip;
    const value3 = component.getInitLongitude();
    expect(value3).toEqual(126.952755);
    component.new_post.region = RegionEnum.snu;
    const value4 = component.getInitLongitude();
    expect(value4).toEqual(126.953480);
  });
  it('test convertJsonToDate func', () => {
    expect(component.convertJsonToDate(null).getMonth()).toBeNaN();
    expect(component.convertJsonToDate(undefined).getMonth()).toBeNaN();
    const date_value = component.convertJsonToDate({year: 2019, month: 2, day: 1});
    expect(date_value).toEqual(new Date(2019, 1, 1, 23, 59));
  });
  it('test addToTimeZone func', () => {
    component.time_zone_hm = [0, 0, 0, 0];
    const date_value = new Date(2019, 1, 1, 23, 59);
    expect(component.create()).toBeUndefined();
  });
});
