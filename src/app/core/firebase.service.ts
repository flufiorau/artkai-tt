import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {CalendarEvent} from '@app/core/interfaces';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  eventsCollection: AngularFirestoreCollection<CalendarEvent>;
  events: Observable<CalendarEvent[]>;
  eventDoc: AngularFirestoreDocument<CalendarEvent>;

  constructor(public afs: AngularFirestore) {
  }

  getEventList() {
    this.eventsCollection = this.afs.collection('events', ref => ref);
    return this.events = this.eventsCollection.snapshotChanges().pipe(
      map(eventsArray => {
        return eventsArray.map(eventItem => {
          const data = eventItem.payload.doc.data() as CalendarEvent;
          data.id = eventItem.payload.doc.id;
          return data;
        });
      })
    );
  }


  addEvent(event: CalendarEvent) {
    this.eventsCollection.add(event);
  }

  deleteEvent(event: CalendarEvent) {
    this.afs.doc(`events/${event.id}`).delete();
  }

  updateEvent(event: CalendarEvent) {
    this.eventDoc = this.afs.doc(`events/${event.id}`);
    this.eventDoc.update(event);
  }

}
