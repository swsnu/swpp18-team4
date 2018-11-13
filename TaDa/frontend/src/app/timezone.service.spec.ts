import { TestBed } from '@angular/core/testing';

import { TimezoneService } from './timezone.service';

describe('TimezoneService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TimezoneService = TestBed.get(TimezoneService);
    expect(service).toBeTruthy();
  });
});
