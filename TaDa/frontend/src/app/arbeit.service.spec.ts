import { TestBed } from '@angular/core/testing';

import { ArbeitService } from './arbeit.service';

describe('ArbeitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArbeitService = TestBed.get(ArbeitService);
    expect(service).toBeTruthy();
  });
});
