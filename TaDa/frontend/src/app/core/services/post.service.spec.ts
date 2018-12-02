import { TestBed } from '@angular/core/testing';

import { Post } from '../models/post';
import { PostService } from './post.service';
import { HttpClientModule } from '@angular/common/http';
import { RegionEnum } from '../models/enums/region-enum.enum';
import { ArbeitTypeEnum } from '../models/enums/arbeit-type-enum.enum';
import { HowToPayEnum } from '../models/enums/how-to-pay-enum.enum';


const mock_post: Post = {
  post_id: 1,
  author_id: 1,
  title: 'title1',
  content: 'content1',
  region: RegionEnum.home,
  region_specific: '윗공대',
  arbeit_type: ArbeitTypeEnum.academy,
  timezone: null,
  how_to_pay: HowToPayEnum.pay_hourly,
  pay_per_hour: 10000,
  goods: null,
  register_date: null,
  last_modify_date: null,
  deadline: null,
  home_expected_time: 30,
  is_magam_user: false,
  is_magam_timeout: false,
  is_same_person: true
};

describe('PostService', () => {
  let postService: PostService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [

      ],
      imports: [
        HttpClientModule
      ],
      providers: [
        PostService,
      ]
    });
  postService = TestBed.get(PostService);
  });

  it('should be created', () => {
    const service: PostService = TestBed.get(PostService);
    expect(service).toBeTruthy();
  });

  it('test getPosts func', () => {
    postService.getPosts()
      .then(post => expect(post).toBeNull());
  });

  it('test getPostByPostId func', () => {
    postService.getPostByPostId(1)
      .then(post => expect(post).toBeNull());
  });

  it('test getPostsByAuthorId func', () => {
    postService.getPostsByAuthorId(1)
      .then(post => expect(post).toBeNull());
  });

});
