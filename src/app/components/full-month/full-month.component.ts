import {Component, OnInit} from '@angular/core';
import {CalendarService} from '@app/core/calendar.service';
import {CalendarEvent, Week} from '@app/core/interfaces';
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

  private firebaseEventsArray: CalendarEvent[] = [];
  private googleCalendarEventsArray: CalendarEvent[] = [];

  constructor(private calendarService: CalendarService,
              private googleCalendarService: GoogleCalendarService,
              private afs: FirebaseService) {
  }

  ngOnInit() {

    this.calendarService.$calendarForView.subscribe((calendarArray: Week[]) => {
      this.calendarDataSource = calendarArray;
    });

    this.afs.getEventList().subscribe(
      (firebaseEventsArray: CalendarEvent[]) => {
        this.firebaseEventsArray = firebaseEventsArray;
        this.calendarService.eventsCalendarDataSource = this.firebaseEventsArray.concat(this.googleCalendarEventsArray);
      });

    this.googleCalendarService.$eventsArrayFromGoogleCalendar.subscribe(
      (googleCalendarEventsArray) => {
        this.googleCalendarEventsArray = googleCalendarEventsArray;
        this.calendarService.eventsCalendarDataSource = this.googleCalendarEventsArray.concat(this.firebaseEventsArray);
      }
    );
  }

}
