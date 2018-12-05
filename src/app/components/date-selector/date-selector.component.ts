import {Component, OnInit} from '@angular/core';
import {CalendarService} from '../../core/calendar.service';

@Component({
  selector: 'app-date-selector',
  templateUrl: './date-selector.component.html',
  styleUrls: ['./date-selector.component.css']
})
export class DateSelectorComponent implements OnInit {

  selectedYear: number;
  selectedMonth: number;

  constructor(private calendarService: CalendarService) {
  }

  ngOnInit() {
    this.loadMonthWithCurrentDay();
  }

  getMonthAndYear(year, month) {
    this.calendarService.setCalendarStartDate(new Date(year, month).getTime());
    this.calendarService.setCalendarEndDate(new Date(year, month + 1, 0).getTime());
    this.calendarService.createCalendarTableDataSource();
  }

  loadPreviousMonth() {
    this.selectedMonth = this.selectedMonth - 1;
    this.getMonthAndYear(this.selectedYear, this.selectedMonth);
  }

  loadNextMonth() {
    this.selectedMonth = this.selectedMonth + 1;
    this.getMonthAndYear(this.selectedYear, this.selectedMonth);
  }

  loadMonthWithCurrentDay() {
    const date = new Date();
    this.selectedYear = date.getFullYear();
    this.selectedMonth = date.getMonth();
    this.getMonthAndYear(this.selectedYear, this.selectedMonth);
  }
}
