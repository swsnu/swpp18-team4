import { Injectable } from '@angular/core';
import { TimeZone, Time } from './Classes/TimeZone';

@Injectable({
  providedIn: 'root'
})
export class TimezoneService {
  constructor() { }

  //must edit it to Korean
  minuteArray = ['00', '10', '20', '30', '40', '50'];
  dayArray = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];

  getDayArray() {
    return this.dayArray;
  }

  format(timezone: TimeZone): string {
    const startdate = this.formatDate(timezone.start);
    const enddate = this.formatDate(timezone.end);
    const starttime = this.formatTime(timezone.start);
    const endtime = this.formatTime(timezone.end);

    if (startdate === enddate) {
           return startdate + starttime + ' - ' + endtime;
      } else {
        return startdate + starttime + ' - ' + enddate + endtime;
      }
  }

  formatDate(time: Time): string {
    return (time.month + '.' + time.date +
    '(' + this.dayArray[time.day] + ')';
  }

  formatTime(time: Time): string {
    return time.hour + ':' + time.minute;
  }


}
