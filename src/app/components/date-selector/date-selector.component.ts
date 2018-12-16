import {Component, OnInit} from '@angular/core';
import {CalendarService} from '@app/core/calendar.service';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.css']
})
export class DateSelectorComponent implements OnInit {

  selectedYear = new BehaviorSubject<number>(0);
  selectedMonth = new BehaviorSubject<number>(0);
  selectedMonthTitle  = new BehaviorSubject<string>('');
  yearForView;
  monthForView;



  constructor(private calendarService: CalendarService) {
  }

  ngOnInit() {
    this.loadMonthWithCurrentDay();
    this.selectedMonthTitle.subscribe(
      res => this.monthForView = res
    );
    this.selectedYear.subscribe(
      res => this.yearForView = res
    );
  }

  getMonthAndYear(year, month) {
    this.getMonthTitle(month);
    this.calendarService.setCalendarStartDate(new Date(year, month));
    this.calendarService.setCalendarEndDate(new Date(year, month + 1, 0));
    this.calendarService.createCalendarTableDataSource();
  }

  loadPreviousMonth() {
    if (this.selectedMonth.value > 0) {
      this.selectedMonth.next(this.selectedMonth.value - 1);
    } else {
      this.selectedMonth.next(11);
      this.selectedYear.next(this.selectedYear.value - 1);
    }
    this.getMonthAndYear(this.selectedYear.value, this.selectedMonth.value);
  }

  loadNextMonth() {
    if (this.selectedMonth.value < 11) {
      this.selectedMonth.next(this.selectedMonth.value + 1);
    } else {
      this.selectedMonth.next(0);
      this.selectedYear.next(this.selectedYear.value + 1);
    }
    this.getMonthAndYear(this.selectedYear.value, this.selectedMonth.value);
  }

  loadMonthWithEventDate(value) {
    this.loadMonthWithCurrentDay(value);
  }

  loadMonthWithCurrentDay(selectedDateFromEvent?: number) {
    let date;
    if (selectedDateFromEvent) {
      date = new Date(selectedDateFromEvent);
    } else {
      date = new Date();
    }
    this.selectedYear.next(date.getFullYear());
    this.selectedMonth.next(date.getMonth());
    this.getMonthAndYear(this.selectedYear.value, this.selectedMonth.value);
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
        this.selectedMonthTitle.next(m.title);
      }
    });
  }
}
