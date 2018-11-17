import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbeitBulletinComponent } from './arbeit-bulletin.component';
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule } from "@angular/forms";

import { mockArbeitPost } from '../mock-ArbeitPost';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ArbeitPost} from "../Classes/ArbeitPost";
import {ArbeitRegionEnum} from "../Enums/ArbeitRegionEnum";
import {ArbeitTypeEnum} from "../Enums/ArbeitTypeEnum";
import {TimeZone} from "../Classes/TimeZone";
import {ArbeitService} from "../arbeit.service";
import {LoginUserService} from "../log-in-user.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import { mockTimeZone, mockTime } from '../mock-TimeZone';


const mockPostList: ArbeitPost[] = [{id: 1, author_id: 1, title: "title1", content: "content1", region: ArbeitRegionEnum.School, arbeit_type: ArbeitTypeEnum.IT,
                                      pay: 1000, time_zone: [], manager_name: "m1", manager_phone: "000-0000-0001", register_date: null, edit_date: null, star: 1},
                                    {id: 2, author_id: 2, title: "title2", content: "content2", region: ArbeitRegionEnum.Nakdae, arbeit_type: ArbeitTypeEnum.Tutoring,
                                      pay: 2222, time_zone: [], manager_name: "m2", manager_phone: "000-0000-0002", register_date: null, edit_date: null, star: 2}
                                      ];
const mockPost: ArbeitPost = mockPostList[0];

describe('ArbeitBulletinComponent', () => {
  let component: ArbeitBulletinComponent;
  let fixture: ComponentFixture<ArbeitBulletinComponent>;

  let arbeitService: ArbeitService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArbeitBulletinComponent ],
      imports: [
        RouterTestingModule,
        FormsModule,
        HttpClientTestingModule,
      ],
      providers: [
        ArbeitService,
      ]
    })
    .compileComponents();
    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    arbeitService = TestBed.get(ArbeitService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArbeitBulletinComponent);
    component = fixture.componentInstance;
    component.dataToShow = mockPostList;
    fixture.detectChanges();
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test doKeywordSearch func when 제목', () => {
    component.search_keyword = 'title1';
    component.search_criteria = '제목';
    component.doKeywordSearch();
    expect(component.dataToShow[0]).toEqual(mockPostList[0]);

    component.dataToShow = mockPostList;
    component.search_keyword = 'title2';
    component.doKeywordSearch();
    expect(component.dataToShow[0]).toEqual(mockPostList[1]);
  });

  it('test doKeywordSearch func when 내용', () => {
    component.search_keyword = 'content1';
    component.search_criteria = '내용';
    component.doKeywordSearch();
    expect(component.dataToShow[0]).toEqual(mockPostList[0]);

    component.dataToShow = mockPostList;
    component.search_keyword = 'content2';
    component.doKeywordSearch();
    expect(component.dataToShow[0]).toEqual(mockPostList[1]);
  });

  it('test doKeywordSearch func when 제목+내용', () => {
    component.search_keyword = '1';
    component.search_criteria = '제목+내용';
    component.doKeywordSearch();
    expect(component.dataToShow[0]).toEqual(mockPostList[0]);

    component.dataToShow = mockPostList;
    component.search_keyword = '2';
    component.doKeywordSearch();
    expect(component.dataToShow[0]).toEqual(mockPostList[1]);
  });

  it('test sorting func by register_date', () => {
    component.dataToShow = mockArbeitPost;
    component.sort(0)
    expect(component.dataToShow[0].id).toEqual(3);
    expect(component.dataToShow[1].id).toEqual(1);
    expect(component.dataToShow[2].id).toEqual(4);
    expect(component.dataToShow[3].id).toEqual(2);
  });

  it('test sorting func by pay', () => {
    component.dataToShow = mockArbeitPost;
    component.sort(1)
    expect(component.dataToShow[0].id).toEqual(2);
    expect(component.dataToShow[1].id).toEqual(4);
    expect(component.dataToShow[2].id).toEqual(1);
    expect(component.dataToShow[3].id).toEqual(3);
  });
  
  it('test sorting func by star', () => {
    component.dataToShow = mockArbeitPost;
    component.sort(2)
    expect(component.dataToShow[0].id).toEqual(2);
    expect(component.dataToShow[1].id).toEqual(4);
    expect(component.dataToShow[2].id).toEqual(3);
    expect(component.dataToShow[3].id).toEqual(1);
  });

  it('filter by region', () => {
    component.dataToShow = mockArbeitPost;
    component.filter_region[1] = true; // Nakdae
    component.filter_region[4] = true; // Extra
    component.filter();

    for(let i =0; i < component.dataToShow.length; i++) {
      let region = component.dataToShow[i].region;
      expect(region === ArbeitRegionEnum.Nakdae || region === ArbeitRegionEnum.Extra).toBe(true);
    }
  });

  it('filter by type', () => {
    component.dataToShow = mockArbeitPost;
    component.filter_type[1] = true; // Tutoring
    component.filter_type[3] = true; // IT
    component.filter();
    for(let i =0; i < component.dataToShow.length; i++) {
      let type = component.dataToShow[i].arbeit_type;
      expect(type === ArbeitTypeEnum.Tutoring || type === ArbeitTypeEnum.IT).toBe(true);
    }
  });



  it('filter by time', () => {
    component.dataToShow = mockArbeitPost;
    component.filter_timeArray = [mockTimeZone[4]];
    component.filter();
    expect(component.dataToShow.length).toEqual(2);
  });

  it('add time', () => {
    component.filter_timeArray = mockArbeitPost;
    const len = component.filter_timeArray.length;
    component.filter_day = 1;
    component.filter_start_hour = 3;
    component.filter_start_min = 0; 
    component.filter_start_hour = 10;
    component.filter_start_min = 0; 
    component.add_timezone();
    expect(component.filter_timeArray.length).toEqual(len+1);
  });

  it('remove time_array', () => {
    component.filter_timeArray = mockArbeitPost;
    const len = component.filter_timeArray.length;
    component.remove_timezone(3);
    expect(component.filter_timeArray.length).toEqual(len-1);
  });

  it('clear time_array', () => {
    component.filter_day = 1;
    component.filter_start_hour = 3;
    component.filter_start_min = 0; 
    component.filter_start_hour = 10;
    component.filter_start_min = 0; 
    component.clear_timezone_field();
    expect(component.filter_day).toEqual(undefined);
    expect(component.filter_start_hour).toEqual(undefined);
  });

});
