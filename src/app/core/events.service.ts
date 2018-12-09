import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {CalendarEvent} from './interfaces';

@Injectable({
  providedIn: 'root'
})

export class EventsService {

  constructor() { }

  createNewCalendarEvent(inputData: string): Observable<boolean> {
    const newEvent = new CalendarEvent();
    const dateNow = new Date();
    let dateFromInputData: Date;
    const dataSplit = inputData.split(',');
    if (dataSplit.length === 3) {
      for (let i = 0; i < dataSplit.length; i++) {
        if (Date.parse(dataSplit[i])) {
          dateFromInputData = new Date(Date.parse(dataSplit[i]));
          dateFromInputData.setFullYear(dateNow.getFullYear());
          if (dateNow > dateFromInputData) {
            dateFromInputData.setFullYear(dateNow.getFullYear() + 1);
          }
          newEvent.date = dateFromInputData;
        }
      }
      console.log(newEvent);

      return of(true);
    } else {
      return of(false);
    }
  }
}
