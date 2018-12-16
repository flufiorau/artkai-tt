import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {FireBaseEvent} from '@app/core/interfaces';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  eventsCollection: AngularFirestoreCollection<FireBaseEvent>;
  searchEventsCollection: AngularFirestoreCollection<FireBaseEvent>;
  events: Observable<FireBaseEvent[]>;
  searchDataSource: Observable<FireBaseEvent[]>;

  constructor(public afs: AngularFirestore) {
  }

  getEventsByMonth(dateBegin: number, dateEnd: number) {
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

  getAllEventsBySearch() {
    this.searchEventsCollection = this.afs.collection('events', ref =>
      ref.orderBy('title').startAt(''));
    return this.searchDataSource = this.searchEventsCollection.snapshotChanges().pipe(
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
  }

  deleteEvent(event: FireBaseEvent) {
    this.afs.doc(`events/${event.id}`).delete();
  }

}
