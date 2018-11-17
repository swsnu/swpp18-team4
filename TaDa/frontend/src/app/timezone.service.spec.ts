import { TestBed } from '@angular/core/testing';
import { TimezoneService } from './timezone.service';
import { Time, TimeZone } from './Classes/TimeZone';
import { mockTimeZone, mockTime } from './mock-TimeZone';

describe('TimezoneService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TimezoneService = TestBed.get(TimezoneService);
    expect(service).toBeTruthy();
  });

  it('test increaseDate func', () => {
    const service: TimezoneService = TestBed.get(TimezoneService);
    let date: TimeZone = {
      month: 10, date: 31, day: 3, start: null, end: null,
    };
    service.increaseDate(date);
    expect(date.month).toEqual(11);
    expect(date.date).toEqual(1);

    date = {
      month: 10, date: 27, day: 6, start: null, end: null,
    };
    expect(service.increaseDate(date));
    expect(date.month).toEqual(10);
    expect(date.date).toEqual(28);
  });

  it('test format', () => {
    const service: TimezoneService = TestBed.get(TimezoneService);
    expect(service.format(mockTimeZone[0])).toEqual('10.27(토):11:00-15:00');
  });

  it('test filterTimeZone func', () => {
    const service: TimezoneService = TestBed.get(TimezoneService);

    let filter_zone = [{
      month: 1, date: 1, day: 6,
      start: { hour: 12, minute: 0},
      end: { hour: 13, minute: 0},
    }, {
    month: 1, date: 1, day: 2,
    start : { hour: 15, minute: 0},
    end: {hour: 19, minute: 0},
    }]
    expect(service.filterTime(mockTimeZone, filter_zone)).toEqual(true);
    expect(service.filterTime([mockTimeZone[1], mockTimeZone[2], mockTimeZone[3]] , filter_zone)).toEqual(false);


  });


  it('test compareDate func', () => {
    const service: TimezoneService = TestBed.get(TimezoneService);

    //10.27, 10.27
    expect(service.compareDate(mockTimeZone[0], mockTimeZone[1])).toEqual(0);
    //10.27, 10.28
    expect(service.compareDate(mockTimeZone[0], mockTimeZone[2])).toEqual(-1);
  });

  it('test compareTime func', () => {
    const service: TimezoneService = TestBed.get(TimezoneService);

    //10:10, 10:20
    expect(service.compareTime(mockTime[0], mockTime[1])).toEqual(-1);    //13:00, 11:30
    expect(service.compareTime(mockTime[4], mockTime[2])).toEqual(1);
  });

  it('test getDay func', () => {
    const service: TimezoneService = TestBed.get(TimezoneService);

    //2018.11.17 is Saturday
    expect(service.getDay(11, 17)).toEqual(6);
    //2018.8.28 is Tuesday
    expect(service.getDay(8, 28)).toEqual(2);
  });

});
