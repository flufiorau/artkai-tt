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
  selectedMonthName: string;

  constructor(private calendarService: CalendarService) {
  }

  ngOnInit() {
    this.loadMonthWithCurrentDay();
  }

  getMonthAndYear(year, month) {
    this.getMonthName(month);
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

  private getMonthName(month: number) {
    const monthArray = [
      {value: 1, name: 'Январь'},
      {value: 2, name: 'Февраль'},
      {value: 3, name: 'Март'},
      {value: 4, name: 'Апрель'},
      {value: 5, name: 'Май'},
      {value: 6, name: 'Июнь'},
      {value: 7, name: 'Июль'},
      {value: 8, name: 'Август'},
      {value: 9, name: 'Сентябрь'},
      {value: 10, name: 'Октябрь'},
      {value: 11, name: 'Ноябрь'},
      {value: 12, name: 'Декабрь'}
    ];
    monthArray.map((m) => {
      if (m.value === month + 1) {
        this.selectedMonthName = m.name;
      }
    });
  }
}
