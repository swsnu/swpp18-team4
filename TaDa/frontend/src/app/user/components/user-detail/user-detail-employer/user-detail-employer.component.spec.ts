import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/core/services/user.service';
import { TalkService } from 'src/app/core/services/talk.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { mock_users } from 'src/app/shared/mock/mock-user';
import { of } from 'rxjs';

import { UserDetailEmployerComponent } from './user-detail-employer.component';

describe('UserDetailEmployerComponent', () => {
  let component: UserDetailEmployerComponent;
  let fixture: ComponentFixture<UserDetailEmployerComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;
  let talkServiceSpy: jasmine.SpyObj<TalkService>;
  let modalServiceSpy: jasmine.SpyObj<NgbModal>;

  beforeEach(async(() => {
    toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['warning', 'success']);
    userServiceSpy = jasmine.createSpyObj('UserService', ['setLoginUser', 'updateUser']);
    talkServiceSpy = jasmine.createSpyObj('TalkService', ['createPopup']);
    modalServiceSpy = jasmine.createSpyObj('NgbModal', ['open', 'dismissAll']);

    TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule, FormsModule],
      declarations: [ UserDetailEmployerComponent ],
      providers:[
        { provide: ToastrService, useValue: toastrServiceSpy },
        { provide: UserService, useValue: userServiceSpy },
       // { provide: TalkService, useValue: talkServiceSpy },
        { provide: NgbModal, useValue: modalServiceSpy },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailEmployerComponent);
    component = fixture.componentInstance;

    userServiceSpy.updateUser.and.returnValue(of(mock_users[0]).toPromise());
    component.user = mock_users[0];
    component.isMyPage = true;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('test confirm', () => {
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

  /*
  it('test chatting related functions', () => {
    component.preloadChatPopup(mock_users[0]);
    expect(talkServiceSpy.createPopup.calls.count()).toEqual(0);
  });*/

});