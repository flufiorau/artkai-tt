// export class CalendarEvent {
//   title: string
//   date: number;
//   description: string;
//   members: string;
//   editFlag?: boolean;
//   constructor() {
//   this.date = 0;
//   this.description = '';
//   this.members = '';
// }
// }

export interface FireBaseEvent {
  title: string;
  id?: string;
  date: number;
  description: string;
  members: string;
}

export interface CalendarEventFromForm {
  title: string;
  eventDate: number;
  eventDescription?: string;
  eventMembers?: string;
}

// export interface Day {
//   unixDate: number;
//   event: FireBaseEvent;
// }

export class Week {
  monday: number;
  tuesday: number;
  wednesday: number;
  thursday: number;
  friday: number;
  saturday: number;
  sunday: number;

  constructor() {
    this.monday = 0;
    this.tuesday = 0;
    this.wednesday = 0;
    this.thursday = 0;
    this.friday = 0;
    this.saturday = 0;
    this.sunday = 0;
  }
}
