import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {FireBaseEvent} from '@app/core/interfaces';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  eventsCollection: AngularFirestoreCollection<FireBaseEvent>;
  events: Observable<FireBaseEvent[]>;
  eventDoc: AngularFirestoreDocument<FireBaseEvent>;

  constructor(public afs: AngularFirestore) {
  }

  getEventsByMonth(dateBegin: number, dateEnd: number) {
    // this.eventsCollection = this.afs.collection('events', ref => ref.orderBy('date', 'asc'));
    this.eventsCollection = this.afs.collection('events', ref => ref.where('date', '>=', dateBegin).where('date', '<=', dateEnd));
    return this.events = this.eventsCollection.snapshotChanges().pipe(
      map(eventsArray => {
        return eventsArray.map(eventItem => {
          const data = eventItem.payload.doc.data() as FireBaseEvent;
          data.id = eventItem.payload.doc.id;
          return data;
        });
      })
    );
  }

  addEvent(event: FireBaseEvent) {
    this.eventsCollection.add(event);
    // this.getEventsByMonth();
  }

  deleteEvent(event: FireBaseEvent) {
    this.eventDoc = this.afs.doc(`events/${event.id}`);
    this.eventDoc.delete();
  }

  updateEvent(event: FireBaseEvent) {
    this.eventDoc = this.afs.doc(`events/${event.id}`);
    this.eventDoc.update(event);
    // this.events = this.afs.collection('events').valueChanges();
  }
}
