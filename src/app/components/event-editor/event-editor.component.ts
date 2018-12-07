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
  @Input() weekNumber: number;
  revertCSSPosition: boolean;
  upperCSSPosition: boolean;

  constructor() {
  }

  ngOnInit() {
    if (this.dateFromCell.getDay() > 4 || this.dateFromCell.getDay() === 0) {
      this.revertCSSPosition = true;
    }
    if (this.weekNumber > 3) {
      console.log(this.weekNumber);
      this.upperCSSPosition = true;
    }
  }

  addNewEventToBase() {

  }

  deleteCurrentEvent() {

  }
}
