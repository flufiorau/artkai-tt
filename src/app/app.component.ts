import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {GoogleApiService, GoogleAuthService} from 'ng-gapi';
import {GoogleCalendarService} from '@app/core/google-calendar.service';
import GoogleUser = gapi.auth2.GoogleUser;
import {CalendarList, CalendarListEntry, Events, Event, CalendarEvent} from '@app/core/interfaces';
import {BehaviorSubject} from 'rxjs';
import {CalendarService} from '@app/core/calendar.service';

export const SESSION_STORAGE_KEY = 'accessToken';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {

  title = 'artkai-tt';
  private _userIsLoggedIn = new BehaviorSubject(false);
  public userIsLoggedIn: boolean;
  private googleUser: gapi.auth2.GoogleUser;

  constructor(private googleCalendarService: GoogleCalendarService,
              private googleAuthService: GoogleAuthService,
              private googleApiService: GoogleApiService,
              private calendarService: CalendarService,
              private ngZone: NgZone) {
  }

  static getToken(): string {
    const token: string = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!token) {
      throw new Error('no token set , authentication required');
    }
    return sessionStorage.getItem(SESSION_STORAGE_KEY);
  }

  ngOnInit() {
    this._userIsLoggedIn.subscribe(
      (res) => this.userIsLoggedIn = res
    );
    this.googleApiService.onLoad().subscribe(
      () => this.signIn()
    );
  }

  ngOnDestroy() {
    this.signOut();
  }

  private signIn() {
    this.googleAuthService.getAuth().subscribe((auth) => {
      auth.signIn().then(
        (res: GoogleUser) => {
          // console.log(res.getBasicProfile());
          this.ngZone.run(() => {
            this.googleUser = res;
            this._userIsLoggedIn.next(true);
            sessionStorage.setItem(SESSION_STORAGE_KEY, res.getAuthResponse().access_token);
            this.getListCalendars();
          });
        },
        (err) => console.warn(err)
      );
    });
  }

  private signOut() {
    this.googleAuthService.getAuth().subscribe((auth) => {
      if (auth.isSignedIn.get()) {
        auth.signOut().then(() => {
          this._userIsLoggedIn.next(false);
          console.log('User signed out.');
          sessionStorage.removeItem(SESSION_STORAGE_KEY);
        });
      }
    });
  }

  private getListCalendars() {
    this.googleCalendarService.getCalendarOrList(AppComponent.getToken())
      .subscribe((res: CalendarList) => this.parseCalendarOrListFromResponse(res));
  }

  private getCalendarEvents(id) {
    const timeMin = new Date(this.calendarService.calendarStartDate).toISOString(),
      timeMax = new Date(this.calendarService.calendarEndDate).toISOString();
    this.googleCalendarService.getEvents(AppComponent.getToken(), id, timeMin, timeMax)
      .subscribe((res: Events) => this.parseEventsFromResponse(res.items));
  }

  private parseCalendarOrListFromResponse(res: CalendarList) {
    res.items.map((item: CalendarListEntry) => this.getCalendarEvents(item.id));
  }

  private parseEventsFromResponse(events: Event[]) {
    this.googleCalendarService.eventsArrayFromGoogleCalendar.next([]);
    const googleEventsArray = [];
    events.map((event: Event) => {
      const dateNow = new Date();
      let splitDate, eventDate;
      if (event.start.date && event.start.date.indexOf('-') !== -1) {
        splitDate = event.start.date.split('-');
      } else {
        splitDate = undefined;
      }
      if (splitDate) {
        eventDate = new Date(parseFloat(splitDate[0]), parseFloat(splitDate[1]) - 1, parseFloat(splitDate[2]));
        if (eventDate >= dateNow) {
          const eventFromGoogleToApp: CalendarEvent = {
            googleCalendarEvent: true,
            id: event.id,
            date: eventDate.getTime(),
            description: event.description,
            title: event.summary,
            members: ''
          };
          googleEventsArray.push(eventFromGoogleToApp);
        }
      }
    });
    this.googleCalendarService.eventsArrayFromGoogleCalendar.next(googleEventsArray);
  }

}
