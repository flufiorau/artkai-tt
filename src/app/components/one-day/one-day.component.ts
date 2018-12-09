import {Component, Input, OnInit} from '@angular/core';
import {CalendarEvent} from '../../core/interfaces';
import {CalendarService} from '../../core/calendar.service';

@Component({
  selector: 'app-one-day',
  templateUrl: './one-day.component.html',
  styleUrls: ['./one-day.component.css']
})
export class OneDayComponent implements OnInit {

  @Input() firstWeekFlag: boolean;
  @Input() thisDay: Date;
  @Input() weekNumber: number;

  calendarEvent: CalendarEvent = {
    date: 21132131232,
    description: 'qwerty qwerty qwerty qwerty ',
    members: ['saSAsASa', 'zxczx']
  };

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
  }

  closeFunc() {
    this.userClickedOnThisDay = false;
  }
}
