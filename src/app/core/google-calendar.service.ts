import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {BehaviorSubject, Observable} from 'rxjs';
import {CalendarEvent, CalendarList, Events} from '@app/core/interfaces';

const API_KEY = 'AIzaSyDB5hsDIrRLprKdJC1DDD8nA8niwZ9snf0';
const API_URL = `https://www.googleapis.com/calendar/v3`;


@Injectable()

export class GoogleCalendarService {

  eventsArrayFromGoogleCalendar = new BehaviorSubject<CalendarEvent[]>([]);
  constructor(private httpClient: HttpClient) {
  }

  getCalendarOrList(token: string): Observable<CalendarList> {
    const url = `${API_URL}/users/me/calendarList/`.replace(/#/g, '%23');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = new HttpParams().set('key', API_KEY);

    return this.httpClient.get(url, {headers: headers, params: params})
      .pipe(
        map((res: CalendarList) => {
          return res;
        }),
        catchError(err => {
          throw err;
        })
      );
  }

  getEvents(token: string, calendarId: string, timeMin: string, timeMax: string): Observable<Events> {
    const url = `${API_URL}/calendars/${calendarId}/events`.replace(/#/g, '%23');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const params = new HttpParams().set('key', API_KEY).set('timeMin', timeMin).set('timeMax', timeMax);

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

  deleteEvent(token: string, calendarId: string, eventId: string): Observable<Events> {
    const url = `${API_URL}/calendars/${calendarId}/events/${eventId}`.replace(/#/g, '%23');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
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

}
