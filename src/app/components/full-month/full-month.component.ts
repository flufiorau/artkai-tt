import {Component, OnInit} from '@angular/core';
import {CalendarService} from '@app/core/calendar.service';
import {Week} from '@app/core/interfaces';

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
    this.calendarService.calendarForView.subscribe((calendarArray: Week[]) => {
      this.calendarDataSource = calendarArray;
    });
  }
}
