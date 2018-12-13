import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FireBaseEvent} from '@app/core/interfaces';
import {FirebaseService} from '@app/core/firebase.service';
import * as moment from 'moment';

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.css']
})
export class EventEditorComponent implements OnInit {

  @Input() dateFromCell: Date;
  @Input() calendarEvent: FireBaseEvent;
  @Output() closeEventEditor = new EventEmitter<boolean>();
  @Input() weekNumber: number;
  revertCSSPosition: boolean;
  upperCSSPosition: boolean;
  public error: string;

  constructor(private afs: FirebaseService) {
  }

  ngOnInit() {
    this.editXYPositionBlock();
  }

  addNewEventToBase() {
    this.afs.addEvent(this.calendarEvent);
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

  validateInputDate(inputData: string) {
    if (inputData.indexOf(',') === -1) {
      return;
    }
    const inputSplitArray = inputData.split(',');

    if (inputSplitArray.length !== 3) {
      this.error = 'Ошибка формата даты: День, месяц, год';
      return;
    }
    console.warn(this.error);
    if (!moment(inputSplitArray[0], 'DD').isValid()) {
      this.error = 'День не корректен';
      return;
    }
    if (!moment(inputSplitArray[1], 'MM').isValid()) {
      this.error = 'Месяц не корректен';
      return;
    }
    if (!moment(inputSplitArray[2], 'YYYY').isValid()) {
      this.error = 'Год не корректен';
      return;
    }
    console.warn('not error');
  }
}
