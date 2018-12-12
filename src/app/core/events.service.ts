import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {CalendarEvent} from '@app/core/interfaces';

@Injectable({
  providedIn: 'root'
})

export class EventsService {

  constructor() { }

  createNewCalendarEvent(newEvent: CalendarEvent): Observable<boolean> {
      return of(true);
  }
}
