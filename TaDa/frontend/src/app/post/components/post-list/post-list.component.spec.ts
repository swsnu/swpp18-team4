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
import { mock_posts, mock_posts_for_scheduler } from 'src/app/shared/mock/mock-post';


import { of } from 'rxjs';
import { PostService } from 'src/app/core/services/post.service';
import { TimeblockService, DraggableCell } from 'src/app/core/services/timeblock.service';

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
    expect(timeblockServiceSpy.createCells.calls.count()).toEqual(1);
  });

  it('button binding funct test', () => {
    component.getMyTagInfo();
    expect(userServiceSpy.isLoggedIn.calls.count()).toEqual(1);
    expect(userServiceSpy.getUserTagInfo.calls.count()).toEqual(1);

  });

  it('sorting test', async() => {
    component.posts_filtered = mock_posts;
    component.sort(0);
    expect(component.posts_filtered[0].id).toEqual(3);
    component.sort(1);
    await expect(component.posts_filtered[0].id).toEqual(5);
    component.sort(2);
    await expect(component.posts_filtered[0].id).toEqual(3);
  });

  it('searching test', async() => {
    await expect(component.search('keyword', 0, component.posts_filtered).length).toEqual(0);
    await expect(component.search('keyword', 1, component.posts_filtered).length).toEqual(1);
    await expect(component.search('keyword', 2, component.posts_filtered).length).toEqual(3);
  });

  it('time-filtering test', async() => {
    let arr = [];
    for (let i = 0; i < 7; i++) {
      let tmp = [];
      for (let j = 0; j < 17; j++) {
        tmp.push(new DraggableCell(i, j, false));
      }
      arr.push(tmp);
    }
    arr[1][4].isSelected= true; arr[1][5].isSelected= true;
    arr[1][6].isSelected= true; arr[1][7].isSelected= true;
    arr[1][8].isSelected= true; arr[1][9].isSelected= true; 
    timeblockServiceSpy.convertCellstoDate.and.returnValue(arr);
    await expect(component.filter_time(mock_posts_for_scheduler).length).toEqual(0);
  });


  it('test tag-handling funcs', () => {
    component.filtering_tags = [
      {type: 2, index: '과외'}, {type: 2, index: '멘토링'}, {type: 3, index: '서울대입구'}, {type: 3, index: '집'}, {type: 4, index: '시급'},
      {type: 2, index: '과외'}, {type: 2, index: '멘토링'}, {type: 3, index: '서울대입구'}, {type: 3, index: '집'}, {type: 4, index: '시급'},
      {type: 2, index: '과외'}, {type: 2, index: '멘토링'}, {type: 3, index: '서울대입구'}, {type: 3, index: '집'}, {type: 4, index: '시급'},
    ]
    component.addTag(3, 0);
    expect(toastrServiceSpy.warning.calls.count()).toEqual(1);
    expect(tagServiceSpy.addTag.calls.count()).toEqual(0);

    /* when tag add succeeds */
    component.filtering_tags = [
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
    console.log(component.filtering_tags);
    expect(component.filtering_tags).toEqual([]);
  });

  it('date handling test', () => {
    expect(component.getStringFromDate(new Date(2018,10,27,13,0))).toEqual('10/27');
    expect(component.getGiganString(mock_posts_for_scheduler[0])).toEqual('11/19');

  });

  it('filtering test', async() => {
    console.log('fitlering test');
    component.filtering_tags = [
      {type: 1, index: 0}, {type: 2, index: 0}, 
      {type: 2, index: 3}, {type: 3, index: 2}, 
      {type: 3, index: 4}
    ];
    
    let arr = component.filtering(mock_posts);
    await expect(arr.length).toEqual(0);


  });

});