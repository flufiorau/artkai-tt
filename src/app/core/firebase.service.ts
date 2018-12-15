import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from '@angular/fire/firestore';
import {BehaviorSubject, Observable} from 'rxjs';
import {FireBaseEvent} from '@app/core/interfaces';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  eventsCollection: AngularFirestoreCollection<FireBaseEvent>;
  searchEventsCollection: AngularFirestoreCollection<FireBaseEvent>;
  events: Observable<FireBaseEvent[]>;
  searchEvents: Observable<FireBaseEvent[]>;
  eventDoc: AngularFirestoreDocument<FireBaseEvent>;
  searchDataSource = new BehaviorSubject<FireBaseEvent[]>([]);

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

  getEventsBySearch(searchString: string) {
    console.log(searchString);
    // this.searchEventsCollection = this.afs.collection('events', ref =>
    //   ref
    //     .orderBy('title')
    //     .startAt(searchString)
    // );

    this.searchEventsCollection = this.afs.collection('events', ref => ref.where(`members`, 'array-contains', searchString));
    console.log(this.searchEventsCollection);
    return this.searchEvents = this.searchEventsCollection.snapshotChanges().pipe(
      map(eventsArray => {
        this.searchDataSource.next(eventsArray);
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

  // updateEvent(event: FireBaseEvent) {
  //   this.eventDoc = this.afs.doc(`events/${event.id}`);
  //   this.eventDoc.update(event);
  //   // this.events = this.afs.collection('events').valueChanges();
  // }
}
