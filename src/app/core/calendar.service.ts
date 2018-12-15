import {Injectable} from '@angular/core';
import {Week} from '@app/core/interfaces';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CalendarService {

  calendarStartDate: number;
  calendarEndDate: number;
  calendarForView = new BehaviorSubject<Week[]>([]);
  selectedDayForEditEvent = new BehaviorSubject<number>(new Date().getTime());

  constructor() {
  }

  setCalendarStartDate(date) {
    const countDaysFromMonday = (date.getDay() - 1);
    this.calendarStartDate = new Date(date.setDate(date.getDate() - countDaysFromMonday)).getTime();
  }

  setCalendarEndDate(date) {
    if (date.getDay() !== 0) {
      const countDaysFromSunday = (7 - date.getDay());
      this.calendarEndDate = new Date(date.setDate(date.getDate() + countDaysFromSunday)).getTime();
    } else {
      this.calendarEndDate = date;
    }
  }

  createCalendarTableDataSource() {
    this.calendarForView.next([]);
    const calendar = [];
    let anyDate = new Date(this.calendarStartDate).getTime();

    do {
      let oneWeek = new Week();
      for (let j = 0; j < 7; j++) {
        switch (new Date(anyDate).getDay()) {
          case 1:
            oneWeek.monday = new Date(anyDate).getTime();
            break;
          case 2:
            oneWeek.tuesday = new Date(anyDate).getTime();
            break;
          case 3:
            oneWeek.wednesday = new Date(anyDate).getTime();
            break;
          case 4:
            oneWeek.thursday = new Date(anyDate).getTime();
            break;
          case 5:
            oneWeek.friday = new Date(anyDate).getTime();
            break;
          case 6:
            oneWeek.saturday = new Date(anyDate).getTime();
            break;
          case 0:
            oneWeek.sunday = new Date(anyDate).getTime();
            break;
        }
        anyDate = new Date(new Date(anyDate).setDate(new Date(anyDate).getDate() + 1)).getTime();
      }
      calendar.push(oneWeek);
      oneWeek = new Week();
    } while (anyDate < this.calendarEndDate);
    this.calendarForView.next(calendar);
  }
}
