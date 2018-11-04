import { TestBed } from '@angular/core/testing';

import { LoginUserService } from './log-in-user.service';

describe('LogInUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LoginUserService = TestBed.get(LoginUserService);
    expect(service).toBeTruthy();
  });
});
