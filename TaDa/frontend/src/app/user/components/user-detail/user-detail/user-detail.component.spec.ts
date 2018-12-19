import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { UserDetailEmployeeComponent } from '../user-detail-employee/user-detail-employee.component';
import { UserDetailEmployerComponent } from '../user-detail-employer/user-detail-employer.component';
import { UserDetailComponent } from './user-detail.component';
import { FormsModule } from '@angular/forms';
import { TagComponent } from 'src/app/shared/tag/tag.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { convertToParamMap, ActivatedRoute } from '@angular/router';


import { UserService } from 'src/app/core/services/user.service';
import { PostService } from 'src/app/core/services/post.service';
import { CommentService } from 'src/app/core/services/comment.service';
import { mock_users } from 'src/app/shared/mock/mock-user';
import { mock_posts } from 'src/app/shared/mock/mock-post';
import { mock_comments } from 'src/app/shared/mock/mock-comment';


describe('UserDetailComponent', () => {
  let component: UserDetailComponent;
  let fixture: ComponentFixture<UserDetailComponent>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let postServiceSpy: jasmine.SpyObj<PostService>;
  let commentServiceSpy: jasmine.SpyObj<CommentService>;

  beforeEach(async(() => {
    const userSpy = jasmine.createSpyObj('UserService', ['getUser', 'getCurrentUser']);
    const postSpy = jasmine.createSpyObj('PostService', ['getPostsByAuthorId', 'getPostByPostId']);
    const commentSpy = jasmine.createSpyObj('CommentService', ['getWriteCommentsByUserId', 'getReceiveCommentsByUserId']);

    TestBed.configureTestingModule({
      declarations: [UserDetailComponent, UserDetailEmployeeComponent, UserDetailEmployerComponent, TagComponent],
      imports: [FormsModule, RouterModule, HttpClientModule, RouterTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: {
          snapshot: {
            paramMap: convertToParamMap({
              id: '1'
            })
        }}},
        { provide: UserService, useValue: userSpy },
        { provide: PostService, useValue: postSpy },
        { provide: CommentService, useValue: commentSpy }
      ]
    })
    .compileComponents();

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailComponent);
    component = fixture.componentInstance;
    userServiceSpy = TestBed.get(UserService);
    userServiceSpy.getUser.and.returnValue(of(mock_users[0]).toPromise()); // mock_users[0] is employer
    postServiceSpy = TestBed.get(PostService);
    postServiceSpy.getPostsByAuthorId.and.returnValue(of(mock_posts).toPromise());
    postServiceSpy.getPostByPostId.and.returnValue(of(mock_posts[0]).toPromise());

    commentServiceSpy = TestBed.get(CommentService);
    commentServiceSpy.getWriteCommentsByUserId.and.returnValue(of(mock_comments).toPromise());
    commentServiceSpy.getReceiveCommentsByUserId.and.returnValue(of(mock_comments).toPromise());

    fixture.detectChanges();
  });
  
  
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  
  it('test ngOnInit when employer', async() => {  
    userServiceSpy.getUser.and.returnValue(of(mock_users[0]).toPromise()); // mock_users[0] is employer 
    setTimeout(function() {
      expect(component.is_employee).toEqual(false);
      expect(commentServiceSpy.getWriteCommentsByUserId.calls.count()).toEqual(0);
      expect(commentServiceSpy.getReceiveCommentsByUserId.calls.count()).toEqual(1);
      }, 3000);
  });

  it('test ngOnInit when employee', async() => {  
    userServiceSpy.getUser.and.returnValue(of(mock_users[1]).toPromise()); // mock_users[1] is employee 
    setTimeout(function() {
      expect(component.is_employee).toEqual(true);
      expect(commentServiceSpy.getWriteCommentsByUserId.calls.count()).toEqual(1);
      expect(commentServiceSpy.getReceiveCommentsByUserId.calls.count()).toEqual(0);
      }, 3000);
  });
  
  
});
