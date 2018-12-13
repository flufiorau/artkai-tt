import {Component, Input, OnInit} from '@angular/core';
import {FireBaseEvent} from '@app/core/interfaces';
import {CalendarService} from '@app/core/calendar.service';

@Component({
  selector: 'app-one-day',
  templateUrl: './one-day.component.html',
  styleUrls: ['./one-day.component.css']
})
export class OneDayComponent implements OnInit {

  @Input() firstWeekFlag: boolean;
  @Input() thisDay: Date;
  @Input() weekNumber: number;

  calendarEvent: FireBaseEvent;

  selectedDayForEditEvent: Date;
  userClickedOnThisDay: boolean;

  constructor(public calendarService: CalendarService) {
  }


  ngOnInit() {
    this.calendarService.selectedDayForEditEvent.subscribe((selectedDay: Date) => {
      this.selectedDayForEditEvent = selectedDay;
    });
  }

  onClicked(thisDay) {
    if (this.selectedDayForEditEvent === thisDay) {
      this.calendarService.selectedDayForEditEvent.next(null);
      this.userClickedOnThisDay = false;
    }
    this.userClickedOnThisDay = true;
    this.calendarService.selectedDayForEditEvent.next(thisDay);
    this.calendarEvent = {date: undefined, eventName: '', members: []};
  }

  closeFunc() {
    this.userClickedOnThisDay = false;
  }
}
