import { TestBed } from '@angular/core/testing';

import { CommentService } from './comment.service';
import { HttpClientModule } from '@angular/common/http';
import { Comment } from '../models/comment';

const mock_comment: Comment = {
  id: 1,
  post_id: 1,
  refer_comment_id: 1,
  author_id: 1,
  star: 5,
  content: 'content1',
  register_date: null,
  last_modify_date: null
};

describe('CommentService', () => {
  let commentService: CommentService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [

      ],
      imports: [
        HttpClientModule
      ],
      providers: [
        CommentService,
      ]
    });
    commentService = TestBed.get(CommentService);
  });

  it('should be created', () => {
    const service: CommentService = TestBed.get(CommentService);
    expect(service).toBeTruthy();
  });

  it('test getWriteCommentsByPostId func', () => {
    commentService.getWriteCommentsByPostId(1)
      .then(comment => expect(comment).toBeNull());
  });

  it('test getReceiveCommentsByUserId func', () => {
    commentService.getReceiveCommentsByUserId(1)
      .then(comment => expect(comment).toBeNull());
  });

  it('test getWriteCommentsByUserId func', () => {
    commentService.getWriteCommentsByUserId(1)
      .then(comment => expect(comment).toBeNull());
  });
});
