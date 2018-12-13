export class CalendarEvent {
  date: Date;
  description: string;
  members: string[];
  editFlag?: boolean;
  constructor() {
  this.date = new Date(0);
  this.description = '';
  this.members = [];
}
}

export interface FireBaseEvent {
  eventName: string;
  id?: string;
  date: Date;
  description?: string;
  members: string[];
}

export interface Day {
  unixDate: number;
  event: CalendarEvent;
}

export class Week {
  monday: Date;
  tuesday: Date;
  wednesday: Date;
  thursday: Date;
  friday: Date;
  saturday: Date;
  sunday: Date;

  constructor() {
    this.monday = new Date(0);
    this.tuesday = new Date(0);
    this.wednesday = new Date(0);
    this.thursday = new Date(0);
    this.friday = new Date(0);
    this.saturday = new Date(0);
    this.sunday = new Date(0);
  }
}
