import {Component, OnInit} from '@angular/core';
import {CalendarService} from '../../core/calendar.service';
import {Week} from '../../core/interfaces';

@Component({
  selector: 'app-full-month',
  templateUrl: './full-month.component.html',
  styleUrls: ['./full-month.component.css']
})
export class FullMonthComponent implements OnInit {

  columns = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  calendarDataSource: Week[];

  constructor(private calendarService: CalendarService) {
  }

  ngOnInit() {
    this.calendarService.calendarForView.subscribe((array: Week[]) => {
      this.calendarDataSource = array;
    });
  }
}
