import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CalendarEvent} from '../../core/interfaces';

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.css']
})
export class EventEditorComponent implements OnInit {

  @Input() dateFromCell: Date;
  @Input() calendarEvent: CalendarEvent;
  @Output() closeEventEditor = new EventEmitter<boolean>();
  @Input() weekNumber: number;
  revertCSSPosition: boolean;
  upperCSSPosition: boolean;

  constructor() {
  }

  ngOnInit() {
    this.editXYPositionBlock();
  }

  addNewEventToBase() {

  }

  deleteCurrentEvent() {

  }

  closeEventEditorForm() {
    this.closeEventEditor.emit();
  }

  private editXYPositionBlock() {
    if (this.dateFromCell.getDay() > 4 || this.dateFromCell.getDay() === 0) {
      this.revertCSSPosition = true;
    }
    if (this.weekNumber > 3) {
      this.upperCSSPosition = true;
    }
  }
}
