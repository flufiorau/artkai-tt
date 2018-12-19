export interface CalendarEvent {
  id?: string;
  title: string;
  description: string;
  members: string;
  date: number;
  googleCalendarEvent: boolean;
}

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

export interface CalendarList {
  'kind': 'calendar#calendarList';
  'string;': string;
  'nextPageToken': string;
  'nextSyncToken': string;
  'items': CalendarListEntry[];
}

export interface CalendarListEntry {
  'kind': 'calendar#calendarListEntry';
  'string;': string;
  'id': string;
  'summary': string;
  'description': string;
  'location': string;
  'timeZone': string;
  'summaryOverride': string;
  'colorId': string;
  'backgroundColor': string;
  'foregroundColor': string;
  'hidden': boolean;
  'selected': boolean;
  'accessRole': string;
  'defaultReminders': [{ 'method': string; 'minutes': number }];
  'notificationSettings': { 'notifications': [{ 'type': string; 'method': string }] };
  'primary': boolean;
  'deleted': boolean;
  'conferenceProperties': { 'allowedConferenceSolutionTypes': [string] };
}

export interface Events {
  'kind': 'calendar#events';
  'etag': string;
  'summary': string;
  'description': string;
  'updated': string;
  'timeZone': string;
  'accessRole': string;
  'defaultReminders': [
    {
      'method': string,
      'minutes': number
    }
    ];
  'nextPageToken': string;
  'nextSyncToken': string;
  'items': Event[];
}

export interface Event {
  'kind': string;
  'etag': string;
  'id': string;
  'status': string;
  'description': string;
  'htmlLink': string;
  'created': string;
  'updated': string;
  'summary': string;
  'creator': { 'email': string, 'displayName': string, 'self': boolean };
  'organizer': { 'email': string, 'displayName': string, 'self': boolean };
  'start': { 'date': string };
  'end': { 'date': string };
  'iCalUID': string;
  'sequence': number;
  'attendees': [{
    'email': string,
    'displayName': string,
    'organizer': boolean
    'self': boolean
    'responseStatus': string
  }];
  'reminders': { 'useDefault': boolean };
}

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
