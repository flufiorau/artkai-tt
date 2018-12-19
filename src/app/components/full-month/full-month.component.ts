import {Component, OnInit} from '@angular/core';
import {CalendarService} from '@app/core/calendar.service';
import {CalendarEvent, FireBaseEvent, Week} from '@app/core/interfaces';
import {FirebaseService} from '@app/core/firebase.service';
import {GoogleCalendarService} from '@app/core/google-calendar.service';

@Component({
  selector: 'app-full-month',
  templateUrl: './full-month.component.html',
  styleUrls: ['./full-month.component.css']
})
export class FullMonthComponent implements OnInit {

  columns = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  calendarDataSource: Week[];
  eventsForThisCalendarDataSource: FireBaseEvent[];

  constructor(private calendarService: CalendarService,
              private afs: FirebaseService,
              private googleCalendarService: GoogleCalendarService) {
  }

  ngOnInit() {
    this.calendarService.calendarForView.subscribe((calendarArray: Week[]) => {
      this.calendarDataSource = calendarArray;
      this.afs.getEventsByMonth(this.calendarService.calendarStartDate, this.calendarService.calendarEndDate)
        .subscribe((eventsArray: CalendarEvent[]) => {
          this.eventsForThisCalendarDataSource = [];
          eventsArray.map(event => this.eventsForThisCalendarDataSource.push(event));
          this.googleCalendarService.eventsArrayFromGoogleCalendar.subscribe((googleEventsArray: CalendarEvent[]) => {
            googleEventsArray.map(event => this.eventsForThisCalendarDataSource.push(event));
          });
        });
    });
  }
}
