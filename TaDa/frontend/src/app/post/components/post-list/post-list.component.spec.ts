import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostListComponent } from './post-list.component';
import { FormsModule } from '@angular/forms';
import { TagComponent } from 'src/app/shared/tag/tag.component';
import { TimeblockComponent } from 'src/app/shared/timeblock/timeblock.component';
import { DragToSelectModule } from 'ngx-drag-to-select';
import { ToastrService } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { UserService } from 'src/app/core/services/user.service';
import { TagService } from 'src/app/core/services/tag.service';
import { mock_users } from 'src/app/shared/mock/mock-user';
import { mock_posts } from 'src/app/shared/mock/mock-post';


import { of } from 'rxjs';
import { PostService } from 'src/app/core/services/post.service';
import { TimeblockService } from 'src/app/core/services/timeblock.service';

describe('PostListComponent', () => {
  let component: PostListComponent;
  let fixture: ComponentFixture<PostListComponent>;

  let toastrServiceSpy: jasmine.SpyObj<ToastrService>;
  let userServiceSpy: jasmine.SpyObj<UserService>;
  let tagServiceSpy: jasmine.SpyObj<TagService>;
  let timeblockServiceSpy: jasmine.SpyObj<TimeblockService>;
  let postServiceSpy: jasmine.SpyObj<PostService>;

  beforeEach(async(() => {
    toastrServiceSpy = jasmine.createSpyObj('ToastrService', ['warning']);
    userServiceSpy = jasmine.createSpyObj('UserService', ['isLoggedIn', 'getCurrentUser', 'getUserTagInfo']);
    tagServiceSpy = jasmine.createSpyObj('TagService', ['addTag', 'removeTag', 'existInArray']);
    postServiceSpy = jasmine.createSpyObj('PostService', ['getPosts']);
    timeblockServiceSpy = jasmine.createSpyObj('TimeblockService', ['createCells', 'convertCellstoDate']);


    TestBed.configureTestingModule({
      imports: [FormsModule, RouterModule, HttpClientModule, RouterTestingModule, DragToSelectModule.forRoot()],
      declarations: [ PostListComponent, TagComponent, TimeblockComponent],
      providers:[
        { provide: ToastrService, useValue: toastrServiceSpy },
        { provide: UserService, useValue: userServiceSpy },
        { provide: TagService, useValue: tagServiceSpy},
        { provide: PostService, useValue: postServiceSpy},
        { provide: TimeblockService, useValue: timeblockServiceSpy},
      ]
      
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostListComponent);
    component = fixture.componentInstance;


    postServiceSpy.getPosts.and.returnValue(of(mock_posts).toPromise());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
    expect(component.posts_all.length).toEqual(component.posts_filtered.length);
  });
});
