import { TestBed } from '@angular/core/testing';

import { TimeblockService } from './timeblock.service';

describe('TimeblockService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TimeblockService = TestBed.get(TimeblockService);
    expect(service).toBeTruthy();
  });
});
