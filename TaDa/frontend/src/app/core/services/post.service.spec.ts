import { TestBed } from '@angular/core/testing';

import { PostService } from './post.service';
import { HttpClientModule } from '@angular/common/http';

describe('PostService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    declarations: [

    ],
    imports: [
      HttpClientModule
    ]
  }));

  it('should be created', () => {
    const service: PostService = TestBed.get(PostService);
    expect(service).toBeTruthy();
  });
});
