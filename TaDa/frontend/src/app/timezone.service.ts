import { Injectable } from '@angular/core';
import { TimeZone, Time } from './Classes/TimeZone';

@Injectable({
  providedIn: 'root'
})
export class TimezoneService {
  constructor() { }

  year = 2018;

  minuteArray = ['00', '10', '20', '30', '40', '50'];
  dayArray = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'];
  daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  format(timezone: TimeZone): string {

    return (timezone.month + 1) + '.' + timezone.date + '('
              + this.dayArray[timezone.day] + ')'
              + this.formatTime(timezone.start) + this.formatTime(timezone.end);
  }

  formatTime(time: Time): string {
    return time.hour + ':' + time.minute;
  }

  filterTime(timezones: TimeZone[], filter_arr: TimeZone[]): boolean {
    let day_arr: TimeZone[];
    for (const timezone of timezones) {
      day_arr = filter_arr.filter(
        function (element) {
            return (element.day === timezone.day);
        });

      for (let tmp in day_arr) {
        if (this.compareTime(timezone.start, tmp.start) <= 0
              && this.compareTime(timezone.end, tmp.end) >= 0) {
            return true;
        }
      }
    }
    return false;
  }

  //increase Date by 1 day considering month
  increaseDate(time: TimeZone) {
    if (time.date === this.daysInMonth[time.month]) {
      time.month++;
      time.date = 1;
    } else {
      time.date++;
    }
  }

  // if a is smaller return -1, a is bigger return 1, else return 0
  compareDate(a: TimeZone, b: TimeZone) {
    if (a.month < b.month) {
      return -1;
    } else if (a.month > b.month) {
      return 1;
    } else {
      if (a.date < b.date) {
        return -1;
      } else if (a.date > b.date) {
        return 1;
      } else {
        return 0;
      }
    }
  }

  compareTime(a: Time, b: Time) {
    if (a.hour < b.hour) {
      return -1;
    } else if (a.hour > b.hour) {
      return 1;
    } else {
      if (a.minute < b.minute) {
        return -1;
      } else if (a.minute > b.minute) {
        return 1;
      } else {
        return 0;
      }
    }
  }

  getDay(month: number, day: number): number {
    const date = new Date(this.year, month - 1, day);
    return date.getDay();
  }

}
