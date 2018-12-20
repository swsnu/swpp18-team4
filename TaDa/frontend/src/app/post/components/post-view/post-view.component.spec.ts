import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostViewComponent } from './post-view.component';
import {FormsModule} from '@angular/forms';
import {RouterTestingModule} from '@angular/router/testing';
import {ActivatedRoute, convertToParamMap, Router, RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import {AgmCoreModule} from '@agm/core';
import {NgbDatepickerModule, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {UserService} from '../../../core/services/user.service';
import {TalkService} from '../../../core/services/talk.service';
import {PostService} from '../../../core/services/post.service';
import {CommentService} from '../../../core/services/comment.service';
import {of} from 'rxjs';
import {mock_posts_for_scheduler} from '../../../shared/mock/mock-post';
import {TypeEnum} from '../../../core/models/enums/type-enum.enum';
import { mock_posts } from '../../../shared/mock/mock-post';
import { mock_users } from '../../../shared/mock/mock-user';
import { mock_comments } from '../../../shared/mock/mock-comment';


describe('PostViewComponent', () => {
  let component: PostViewComponent;
  let fixture: ComponentFixture<PostViewComponent>;
  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;
  let talkServiceSpy: jasmine.SpyObj<TalkService>;
  let modalServiceSpy: jasmine.SpyObj<NgbModal>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let postServiceSpy: jasmine.SpyObj<PostService>;
  let commentServiceSpy: jasmine.SpyObj<CommentService>;
  let routerSpy: jasmine.SpyObj<Router>;


  beforeEach(async(() => {
    routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['warning', 'success', 'info']);
    talkServiceSpy = jasmine.createSpyObj('TalkService', ['createPopup']);
    modalServiceSpy = jasmine.createSpyObj('NgbModal', ['open', 'dismissAll']);
    userServiceSpy = jasmine.createSpyObj('UserService', ['getUser', 'getCurrentUser', 'setLoginUser']);
    postServiceSpy = jasmine.createSpyObj('PostService', ['deletePost', 'getPostsByAuthorId', 'getPostByPostId']);
    commentServiceSpy = jasmine.createSpyObj('CommentService',
      ['getWriteCommentsByUserId', 'getReceiveCommentsByUserId', 'getWriteCommentsByPostId', 'createComment', 'deleteComment']);
    TestBed.configureTestingModule({
      declarations: [ PostViewComponent ],
      imports: [
        FormsModule, RouterTestingModule, RouterModule,
        HttpClientModule, AgmCoreModule,
        NgbDatepickerModule
      ],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ToastrService, useValue: toastrServiceSpy },
        { provide: UserService, useValue: userServiceSpy },
        { provide: PostService, useValue: postServiceSpy },
        { provide: CommentService, useValue: commentServiceSpy },
        { provide: NgbModal, useValue: modalServiceSpy },
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
    fixture = TestBed.createComponent(PostViewComponent);
    component = fixture.componentInstance;
    userServiceSpy = TestBed.get(UserService);
    postServiceSpy = TestBed.get(PostService);
    commentServiceSpy = TestBed.get(CommentService);

    postServiceSpy.getPostByPostId.and.returnValue(of(mock_posts[0]).toPromise());
    commentServiceSpy.getWriteCommentsByPostId.and.returnValue(of(mock_comments).toPromise());
    userServiceSpy.getCurrentUser.and.returnValue(of(mock_users[0]).toPromise());
    userServiceSpy.getUser.and.returnValue(of(mock_users[0]).toPromise());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('test getAllUser func', () => {
    component.post_comments = mock_comments;
    component.getAllUser();
    expect(component.all_users).toEqual([]);
  });
  it('test referOfComment', () => {
    component.refer_comments = mock_comments;
    const result = component.getAllUser();
    expect(result).toEqual(undefined);
  });
  it('test back func', () => {
    component.back();
    const spy = routerSpy.navigateByUrl;
    const navArgs = spy.calls.first().args[0];
    expect(navArgs).toBe('/post/list/');
  });
  it('test edit func', () => {
    component.edit();
    const spy = routerSpy.navigateByUrl;
    const navArgs = spy.calls.first().args[0];
    expect(navArgs).toBe('/post/edit/1');
  });
  it('test magam func', () => {
    component.current_post = mock_posts[0];
    component.id = 1;
    component.current_post.is_magam_user = true;
    component.magam();
    expect(toastrServiceSpy.warning.calls.count()).toEqual(1);
  });
  it('test getAuthorName func', () => {
    component.all_users = mock_users;
    const temp_comment = mock_comments[0];
    temp_comment.author_id = 1;
    const result1 = component.getAuthorname(temp_comment);
    expect(result1).toEqual('mock-company-1');
    temp_comment.author_id = 2;
    const result2 = component.getAuthorname(temp_comment);
    expect(result2).toEqual(null);
  });
  it('test ConfirmComment func', () => {
    commentServiceSpy.createComment.and.returnValue(of(mock_comments[0]).toPromise());
    component.ConfirmComment('', 0, 0);
    expect(toastrServiceSpy.warning.calls.count()).toEqual(0);
    component.ConfirmComment('1', 0, 0);
  });
  it('test deleteComment func', () => {
    spyOn(window, 'alert');
    commentServiceSpy.deleteComment.and.returnValue(of(mock_comments[0]).toPromise());
    component.deleteComment(mock_comments[0]);
    expect(toastrServiceSpy.warning.calls.count()).toEqual(0);
  });
});
