import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TagComponent } from 'src/app/shared/tag/tag.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/services/user.service';
import { TalkService } from 'src/app/core/services/talk.service';

import { of } from 'rxjs';

import { mock_users } from 'src/app/shared/mock/mock-user';

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
    const userSpy = jasmine.createSpyObj('UserService', ['getUserTagInfo', 'setLoginUser', 'updateUser']);
    const talkSpy = jasmine.createSpyObj('TalkService', ['createPopup']);
    const tagSpy = jasmine.createSpyObj('TagService', ['addTag', 'removeTag', 'existInArray']);
    const modalSpy = jasmine.createSpyObj('NgbModal', ['open', 'dismissAll']);

    TestBed.configureTestingModule({
      imports: [FormsModule, RouterTestingModule, HttpClientModule],
      declarations: [ UserDetailEmployeeComponent, TagComponent],
      providers:[
        { provide: ToastrService, useValue: toastrServiceSpy },
        { provide: UserService, useValue: userSpy },
        { provide: TalkService, useValue: talkSpy},
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
    toastrServiceSpy = TestBed.get(ToastrService);
    talkServiceSpy = TestBed.get(TalkService);
   // tagServiceSpy = TestBed.get(TagService);
   // modalServiceSpy = TestBed.get(NgbModal);


    component.user = mock_users[1];
    component.isMyPage = true;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
