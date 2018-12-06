import {Injectable} from '@angular/core';
import {Week} from './interfaces';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CalendarService {

  calendarStartDate = new Date();
  calendarEndDate = new Date();
  oneDayInMilliseconds = 86400000;
  calendarForView = new BehaviorSubject<Week[]>([]);

  constructor() {
  }

  setCalendarStartDate(date) {
    const countDaysFromMonday = (new Date(date).getDay() - 1) * this.oneDayInMilliseconds;
    this.calendarStartDate = new Date(date - countDaysFromMonday);
  }

  setCalendarEndDate(date) {
    if (new Date(date).getDay() !== 0) {
      const countDaysFromSunday = (7 - new Date(date).getDay()) * this.oneDayInMilliseconds;
      this.calendarEndDate = new Date(date + countDaysFromSunday);
    } else {
      this.calendarEndDate = new Date(date);
    }
    this.calendarEndDate.setMilliseconds(999);
    this.calendarEndDate.setSeconds(59);
    this.calendarEndDate.setMinutes(59);
    this.calendarEndDate.setHours(23);
  }

  createCalendarTableDataSource() {
    this.calendarForView.next([]);
    const calendar = [];
    const daysInMonth = ((this.calendarEndDate.getTime() + 1) - this.calendarStartDate.getTime()) / this.oneDayInMilliseconds;
    const weeksInMonth = parseFloat((daysInMonth / 7).toFixed(0));
    let anyDate = this.calendarStartDate.getTime();
    let oneWeek = new Week();
    for (let i = 0; i < weeksInMonth; i++) {
      if (anyDate < this.calendarEndDate.getTime()) {
        for (let j = 0; j < 7; j++) {
          switch (new Date(anyDate).getDay()) {
            case 1:
              oneWeek.monday = anyDate;
              break;
            case 2:
              oneWeek.tuesday = anyDate;
              break;
            case 3:
              oneWeek.wednesday = anyDate;
              break;
            case 4:
              oneWeek.thursday = anyDate;
              break;
            case 5:
              oneWeek.friday = anyDate;
              break;
            case 6:
              oneWeek.saturday = anyDate;
              break;
            case 0:
              oneWeek.sunday = anyDate;
              break;
          }
          anyDate = anyDate + this.oneDayInMilliseconds;
        }
        calendar.push(oneWeek);
        oneWeek = new Week();
      }
    }
    this.calendarForView.next(calendar);
  }
}
