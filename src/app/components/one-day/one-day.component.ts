import {Component, Input, OnInit} from '@angular/core';
import {CalendarEvent} from '@app/core/interfaces';
import {CalendarService} from '@app/core/calendar.service';

@Component({
  selector: 'app-one-day',
  templateUrl: './one-day.component.html',
  styleUrls: ['./one-day.component.css']
})
export class OneDayComponent implements OnInit {

  @Input() firstWeekFlag: boolean;
  @Input() thisDay: number;
  @Input() weekNumber: number;
  @Input() events: CalendarEvent[];

  calendarEvent: CalendarEvent;

  selectedDayForEditEvent: number;
  userClickedOnThisDay: boolean;
  backgroundColor: boolean;

  constructor(public calendarService: CalendarService) {
  }


  ngOnInit() {
    this.calendarService.selectedDayForEditEvent.subscribe((selectedDay: number) => {
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
    this.calendarEvent = this.events.find((event: CalendarEvent) => thisDay === event.date);
  }

  closeFunc() {
    this.userClickedOnThisDay = false;
  }

  setBackgroundColor(): void {
    this.backgroundColor = true;
  }

}
