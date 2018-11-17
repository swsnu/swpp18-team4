import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArbeitBulletinComponent } from './arbeit-bulletin.component';
import { RouterTestingModule } from "@angular/router/testing";
import { FormsModule } from "@angular/forms";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {ArbeitPost} from "../Classes/ArbeitPost";
import {ArbeitRegionEnum} from "../Enums/ArbeitRegionEnum";
import {ArbeitTypeEnum} from "../Enums/ArbeitTypeEnum";
import {TimeZone} from "../Classes/TimeZone";
import {ArbeitService} from "../arbeit.service";
import {LoginUserService} from "../log-in-user.service";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

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

});
