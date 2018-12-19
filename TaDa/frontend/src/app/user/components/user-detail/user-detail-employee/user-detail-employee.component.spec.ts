import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TagComponent } from 'src/app/shared/tag/tag.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/services/user.service';
import { TalkService } from 'src/app/core/services/talk.service';
import { mock_users } from 'src/app/shared/mock/mock-user';
import { of } from 'rxjs';

import { UserDetailEmployeeComponent } from './user-detail-employee.component';
import { TagService } from 'src/app/core/services/tag.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

describe('UserDetailEmployeeComponent', () => {
  let component: UserDetailEmployeeComponent;
  let fixture: ComponentFixture<UserDetailEmployeeComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;
  let talkServiceSpy: jasmine.SpyObj<TalkService>;
  let tagServiceSpy: jasmine.SpyObj<TagService>;
  let modalServiceSpy: jasmine.SpyObj<NgbModal>;

  beforeEach(async(() => {
    toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['warning', 'success']);
    const userSpy = jasmine.createSpyObj('UserService', ['getUserTagInfo', 'setLoginUser', 'updateUser', 'getCurrentUser']);
    const talkSpy = jasmine.createSpyObj('TalkService', ['createPopup']);
    const tagSpy = jasmine.createSpyObj('TagService', ['addTag', 'removeTag', 'existInArray']);
    const modalSpy = jasmine.createSpyObj('NgbModal', ['open', 'dismissAll']);

    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule, HttpClientModule],
      declarations: [ UserDetailEmployeeComponent, TagComponent],
      providers:[
        { provide: ToastrService, useValue: toastrServiceSpy },
        { provide: UserService, useValue: userSpy },
      //  { provide: TalkService, useValue: talkSpy},
        { provide: TagService, useValue: tagSpy},
        { provide: NgbModal, useValue: modalSpy}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailEmployeeComponent);
    component = fixture.componentInstance;

    userServiceSpy = TestBed.get(UserService);
    userServiceSpy.updateUser.and.returnValue(of(mock_users[1]).toPromise());
    toastrServiceSpy = TestBed.get(ToastrService);
    talkServiceSpy = TestBed.get(TalkService);
    tagServiceSpy = TestBed.get(TagService);
    modalServiceSpy = TestBed.get(NgbModal);


    component.user = mock_users[1];
    component.isMyPage = true;
    fixture.detectChanges();
  });

  it('test ngOnInit', () => {
    component.ngOnInit();
    expect(component.region_enum_list.length).toEqual(6);
    expect(component.arbeit_type_enum_list.length).toEqual(11);
    expect(component.how_to_pay_enum_list.length).toEqual(5);
    expect(userServiceSpy.getUserTagInfo.calls.count()).toEqual(2);

  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('test confirm - when change tag', () => {
    component.tag_list = [
      {type: 2, index: '과외'},
      {type: 2, index: '멘토링'},
      {type: 4, index: '시급'},
    ]
    component.confirm();
    expect(userServiceSpy.updateUser.calls.count()).toEqual(1);
    expect(toastrServiceSpy.success.calls.count()).toEqual(1);
  });


  it('test modal related functions', () => {
    component.edit(null);
    expect(modalServiceSpy.open.calls.count()).toEqual(1);

    component.close();
    expect(modalServiceSpy.dismissAll.calls.count()).toEqual(1);
  });




  /* testing tags */
  it('test tags', () => {
    /* when tag number exceeds 5 */
    component.tag_list = [
      {type: 2, index: '과외'},
      {type: 2, index: '멘토링'},
      {type: 3, index: '서울대입구'},
      {type: 3, index: '집'},
      {type: 4, index: '시급'},
    ]
    component.addTag(3, 0);
    expect(toastrServiceSpy.warning.calls.count()).toEqual(1);
    expect(tagServiceSpy.addTag.calls.count()).toEqual(0);

    /* when tag add succeeds */
    component.tag_list = [
      {type: 2, index: '과외'},
      {type: 2, index: '멘토링'},
      {type: 3, index: '서울대입구'},
    ]
    component.addTag(3, 0);
    expect(tagServiceSpy.addTag.calls.count()).toEqual(1);
    
    /* tag remove */
    component.removeTag(4, 0);
    expect(tagServiceSpy.removeTag.calls.count()).toEqual(1);

    /* tag existInArray */
    component.existInArray(3,3);
    expect(tagServiceSpy.existInArray.calls.count()).toEqual(1);

    /* tag clear */
    component.clearTag();
    console.log(component.tag_list);
    expect(component.tag_list.length).toEqual(0);
  });
  
});
