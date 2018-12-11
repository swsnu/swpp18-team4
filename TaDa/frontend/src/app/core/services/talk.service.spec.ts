import { TestBed } from '@angular/core/testing';

import { TalkService } from './talk.service';

describe('TalkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TalkService = TestBed.get(TalkService);
    expect(service).toBeTruthy();
  });
});
