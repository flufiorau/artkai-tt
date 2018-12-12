import {Injectable} from '@angular/core';
import {Week} from '@app/core/interfaces';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CalendarService {

  calendarStartDate: Date;
  calendarEndDate: Date;
  calendarForView = new BehaviorSubject<Week[]>([]);
  selectedDayForEditEvent = new BehaviorSubject<Date>(new Date);

  constructor() {
  }

  setCalendarStartDate(date) {
    const countDaysFromMonday = (date.getDay() - 1);
    this.calendarStartDate = new Date(date.setDate(date.getDate() - countDaysFromMonday));
  }

  setCalendarEndDate(date) {
    if (date.getDay() !== 0) {
      const countDaysFromSunday = (7 - date.getDay());
      this.calendarEndDate = new Date(date.setDate(date.getDate() + countDaysFromSunday));
    } else {
      this.calendarEndDate = date;
    }
  }

  createCalendarTableDataSource() {
    this.calendarForView.next([]);
    const calendar = [];
    let anyDate = new Date(this.calendarStartDate.getTime());

    do {
      let oneWeek = new Week();
      for (let j = 0; j < 7; j++) {
        switch (anyDate.getDay()) {
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
        anyDate = new Date(this.calendarStartDate.setDate(this.calendarStartDate.getDate() + 1));
      }
      calendar.push(oneWeek);
      oneWeek = new Week();
    } while (anyDate < this.calendarEndDate);
    this.calendarForView.next(calendar);
  }
}
