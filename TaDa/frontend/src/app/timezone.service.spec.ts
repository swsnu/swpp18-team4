import { TestBed } from '@angular/core/testing';
import { TimezoneService } from './timezone.service';

describe('TimezoneService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  const service: TimezoneService = TestBed.get(TimezoneService);

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /*it('test compareTime func', () => {
    expect(service.isLoggedIn()).toBeFalsy();
    service.LogInUser = new User;
    expect(service.isLoggedIn()).toBeTruthy();
  });*/

  it('test getDay func', () => {
    //2018.11.17 is Saturday
    expect(service.getDay(11, 17)).toEqual(6);
    //2018.8.28 is Tuesday
    expect(service.getDay(8, 28)).toEqual(2);
  });

});
