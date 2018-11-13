import { Injectable } from '@angular/core';
import { TimeZone } from './Classes/TimeZone';

@Injectable({
  providedIn: 'root'
})
export class TimezoneService {
  constructor() { }
  dayArray = ['sun', 'mon', 'tue', 'wed', 'thur', 'Fri', 'sat'];

  getDayArray() {
    return this.dayArray;
  }

  format(time: TimeZone): string {
    const startdate = this.formatDate(time.startDate);
    const enddate = this.formatDate(time.endDate);
    const starttime = this.formatTime(time.startDate);
    const endtime = this.formatTime(time.endDate);

    if (startdate === enddate) {
           return startdate + starttime + ' - ' + endtime;
      } else {
        return startdate + starttime + ' - ' + enddate + endtime;
      }
  }

  formatDate(date: Date): string {
    return (date.getMonth() + 1) + '.' + date.getDay() +
    '(' + this.dayArray[date.getDay()] + ')';
  }

  formatTime(date: Date): string {
    return (date.getHours() + 1) + ':' + (date.getMinutes());
  }
}
