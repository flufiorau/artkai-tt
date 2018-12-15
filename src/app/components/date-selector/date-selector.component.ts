import {Component, OnInit} from '@angular/core';
import {CalendarService} from '@app/core/calendar.service';

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.css']
})
export class DateSelectorComponent implements OnInit {

  selectedYear: number;
  selectedMonth: number;
  selectedMonthTitle: string;

  constructor(private calendarService: CalendarService) {
  }

  ngOnInit() {
    this.loadMonthWithCurrentDay();
  }

  getMonthAndYear(year, month) {
    this.getMonthTitle(month);
    this.calendarService.setCalendarStartDate(new Date(year, month));
    this.calendarService.setCalendarEndDate(new Date(year, month + 1, 0));
    this.calendarService.createCalendarTableDataSource();
  }

  loadPreviousMonth() {
    if (this.selectedMonth > 0) {
      --this.selectedMonth;
    } else {
      this.selectedMonth = 11;
      --this.selectedYear;
    }
    this.getMonthAndYear(this.selectedYear, this.selectedMonth);
  }

  loadNextMonth() {
    if (this.selectedMonth < 11) {
      ++this.selectedMonth;
    } else {
      this.selectedMonth = 0;
      ++this.selectedYear;
    }
    this.getMonthAndYear(this.selectedYear, this.selectedMonth);
  }

  loadMonthWithCurrentDay() {
    const date = new Date();
    this.selectedYear = date.getFullYear();
    this.selectedMonth = date.getMonth();
    this.getMonthAndYear(this.selectedYear, this.selectedMonth);
  }

  private getMonthTitle(month: number) {
    const monthArray = [
      {value: 1, title: 'Январь'},
      {value: 2, title: 'Февраль'},
      {value: 3, title: 'Март'},
      {value: 4, title: 'Апрель'},
      {value: 5, title: 'Май'},
      {value: 6, title: 'Июнь'},
      {value: 7, title: 'Июль'},
      {value: 8, title: 'Август'},
      {value: 9, title: 'Сентябрь'},
      {value: 10, title: 'Октябрь'},
      {value: 11, title: 'Ноябрь'},
      {value: 12, title: 'Декабрь'}
    ];
    monthArray.map((m) => {
      if (m.value === month + 1) {
        this.selectedMonthTitle = m.title;
      }
    });
  }
}
