import {Injectable, NgZone} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {CalendarEvent, CalendarList, CalendarListEntry, Event, Events} from '@app/core/interfaces';
import GoogleUser = gapi.auth2.GoogleUser;
import {CalendarService} from '@app/core/calendar.service';
import {GoogleAuthService} from 'ng-gapi';

const SESSION_STORAGE_KEY = 'accessToken';
const API_KEY = 'AIzaSyDB5hsDIrRLprKdJC1DDD8nA8niwZ9snf0';
const API_URL = `https://www.googleapis.com/calendar/v3`;


@Injectable()

export class GoogleCalendarService {

  $eventsArrayFromGoogleCalendar = new BehaviorSubject<CalendarEvent[]>([]);
  private googleUser: gapi.auth2.GoogleUser;

  constructor(private httpClient: HttpClient,
              private googleAuthService: GoogleAuthService,
              private calendarService: CalendarService,
              private ngZone: NgZone) {
  }

  signIn() {
    this.googleAuthService.getAuth().subscribe((auth) => {
      auth.signIn().then(
        (res: GoogleUser) => {
          // console.log(res.getBasicProfile());
          this.ngZone.run(() => {
            this.googleUser = res;
            sessionStorage.setItem(SESSION_STORAGE_KEY, res.getAuthResponse().access_token);
            this.getListCalendar().subscribe();
          });
        },
        (err) => console.warn(err)
      );
    });
  }

  signOut() {
    this.googleAuthService.getAuth().subscribe((auth) => {
      if (auth.isSignedIn.get()) {
        auth.signOut().then(() => {
          console.log('User signed out.');
          sessionStorage.removeItem(SESSION_STORAGE_KEY);
        });
      }
    });
  }

  getToken(): string {
    const token: string = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!token) {
      console.error('no token set , authentication required');
      return;
    }
    return sessionStorage.getItem(SESSION_STORAGE_KEY);
  }

  getListCalendar(): Observable<void> {
    const url = `${API_URL}/users/me/calendarList/`.replace(/#/g, '%23');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
    const params = new HttpParams().set('key', API_KEY);

    return this.httpClient.get(url, {headers: headers, params: params})
      .pipe(
        map((res: CalendarList) => {
          res.items.map((item: CalendarListEntry) => this.getCalendarEvents(item.id));
        }),
        catchError(err => {
          throw err;
        })
      );
  }

  getEvents(calendarId: string): Observable<Events> {
    const url = `${API_URL}/calendars/${calendarId}/events`.replace(/#/g, '%23');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
    const params = new HttpParams().set('key', API_KEY);

    return this.httpClient.get(url, {headers: headers, params: params})
      .pipe(
        map((res: Events) => {
          return res;
        }),
        catchError(err => {
          throw err;
        })
      );
  }

  deleteEvent(calendarId: string, eventId: string): Observable<Events> {
    const url = `${API_URL}/calendars/${calendarId}/events/${eventId}`.replace(/#/g, '%23');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);
    const params = new HttpParams().set('key', API_KEY);

    return this.httpClient.delete(url, {headers: headers, params: params})
      .pipe(
        map((res: Events) => {
          return res;
        }),
        catchError(err => {
          throw err;
        })
      );
  }

  parseEventsFromResponse(events: Event[]) {
    const resultArray = [];
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
          resultArray.push(eventFromGoogleToApp);
        }
      }
    });
    this.$eventsArrayFromGoogleCalendar.next(resultArray.concat(this.$eventsArrayFromGoogleCalendar.value));
  }

  private getCalendarEvents(byCalendarId) {
    this.getEvents(byCalendarId).subscribe((res: Events) => this.parseEventsFromResponse(res.items));
  }
}
