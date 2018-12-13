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
    this.eventsCollection = this.afs.collection('events', ref => ref.orderBy('date', 'asc'));

    this.events = this.eventsCollection.snapshotChanges().pipe(
      map(changes => {
        return changes.map(a => {
          const data = a.payload.doc.data() as FireBaseEvent;
          data.id = a.payload.doc.id;
          return data;
        });
      })
    );
  }

  getEvents() {
    return this.events;
  }

  addEvent(event: FireBaseEvent) {
    this.eventsCollection.add(event);
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
