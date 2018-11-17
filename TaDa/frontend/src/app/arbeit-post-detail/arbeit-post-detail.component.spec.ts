import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientModule } from "@angular/common/http";
import { ArbeitPostDetailComponent } from './arbeit-post-detail.component';
import { ArbeitPost } from '../Classes/ArbeitPost';
import { ArbeitRegionEnum } from '../Enums/ArbeitRegionEnum';
import { ArbeitTypeEnum } from '../Enums/ArbeitTypeEnum';

describe('ArbeitPostDetailComponent', () => {
  let component: ArbeitPostDetailComponent;
  let fixture: ComponentFixture<ArbeitPostDetailComponent>;
  const ex_post: ArbeitPost = {
    id: 1,
    author_id: 1,
    title: 'this is title',
    content: 'this is content',
    region: ArbeitRegionEnum.SNUStation,
    arbeit_type: ArbeitTypeEnum.IT,
    pay: 8000,
    time_zone: null,
    manager_name: 'Chaehyun',
    manager_phone: '010-4818-4174',
    register_date: null,
    edit_date: null,
    star: 1
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArbeitPostDetailComponent ],
      imports: [
        RouterTestingModule,
        HttpClientModule,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArbeitPostDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.ngOnInit();
    component.post = ex_post;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
