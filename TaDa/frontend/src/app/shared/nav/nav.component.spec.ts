import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavComponent } from './nav.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import {RegionEnum} from '../../core/models/enums/region-enum.enum';
import {ArbeitTypeEnum} from '../../core/models/enums/arbeit-type-enum.enum';
import {HowToPayEnum} from '../../core/models/enums/how-to-pay-enum.enum';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {UserService} from '../../core/services/user.service';

const mock_post = {
  id: 1,
  author_id: 1,
  author_name: 'aaa',
  title: 'title1',
  content: 'content1',
  region: RegionEnum.seoulip,
  region_specific: '서울대입구역 9번출구',
  arbeit_type: ArbeitTypeEnum.academy,
  timezone: [new Date(2018, 11, 22, 11, 0), new Date(2018, 11, 22, 13, 0)],
  how_to_pay: HowToPayEnum.pay_hourly,
  pay_per_hour: 10000,
  goods: null,
  register_date: new Date(),
  last_modify_date: null,
  deadline: null,
  home_expect_time: null,
  is_magam_user: false,
  is_magam_timeout: false,
  is_same_person: false,
  latitude: 37.480955,
  longitude: 126.952208
};

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;
  let modalServiceSpy: jasmine.SpyObj<NgbModal>;


  beforeEach(async(() => {
    modalServiceSpy = jasmine.createSpyObj('NgbModal', ['open', 'dismissAll']);

    TestBed.configureTestingModule({
      declarations: [ NavComponent ],
      imports: [
        HttpClientModule,
        RouterTestingModule,
        FormsModule
      ],
      providers: [
        { provide: NgbModal, useValue: modalServiceSpy },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('test alarm func', () => {
    expect(component.alarm(null)).toBeUndefined();
  });
  it('test search_click func', () => {
    component.all_posts = [mock_post];
    component.key_word = '1';
    component.search_click(null);
    expect(component.search_posts).toEqual([mock_post]);
  });
});
