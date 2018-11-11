import { TestBed } from '@angular/core/testing';

import { CurrentArbeitPostService } from './current-arbeit-post.service';

describe('CurrentArbeitPostService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurrentArbeitPostService = TestBed.get(CurrentArbeitPostService);
    expect(service).toBeTruthy();
  });
});
