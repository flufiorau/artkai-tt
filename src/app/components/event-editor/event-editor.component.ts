import {Component, Input, OnInit} from '@angular/core';
import {CalendarEvent} from '../../core/interfaces';

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.css']
})
export class EventEditorComponent implements OnInit {

  @Input() dateFromCell: Date;
  @Input() calendarEvent: CalendarEvent;

  constructor() {
  }

  ngOnInit() {
  }

  addNewEventToBase() {

  }

  deleteCurrentEvent() {

  }
}
