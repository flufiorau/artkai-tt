import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CalendarEventFromForm, CalendarEvent} from '@app/core/interfaces';
import {FirebaseService} from '@app/core/firebase.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-event-editor',
  templateUrl: './event-editor.component.html',
  styleUrls: ['./event-editor.component.css']
})
export class EventEditorComponent implements OnInit {

  @Input() dateFromCell: number;
  @Input() calendarEvent: CalendarEvent;
  @Output() closeEventEditor = new EventEmitter<boolean>();
  @Input() weekNumber: number;
  revertCSSPosition: boolean;
  upperCSSPosition: boolean;
  public error: string;
  eventEditorFormControl;
  editMode: boolean;

  constructor(private afs: FirebaseService) {
    this.eventEditorFormControl = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(2)]),
      eventDate: new FormControl(''),
      eventMembers: new FormControl(''),
      eventDescription: new FormControl('')
    });
  }

  ngOnInit() {
    this.eventEditorFormControl.controls['eventDate'].setValue(this.dateFromCell);
    this.editXYPositionBlock();
  }

  addNewEventToBase() {
    this.afs.addEvent(this.validateFormInput(this.eventEditorFormControl.value));
    this.closeEventEditor.emit();
  }

  deleteCurrentEvent() {
    this.afs.deleteEvent(this.calendarEvent);
    this.closeEventEditor.emit();
  }

  enterToEditMode(event: CalendarEvent) {
    console.log(event);
    this.editMode = true;
    this.eventEditorFormControl.controls['title'].setValue(event.title);
    if (event.members) {
      this.eventEditorFormControl.controls['eventMembers'].setValue(event.members);
    }
    if (event.description) {
      this.eventEditorFormControl.controls['eventDescription'].setValue(event.description);
    }
  }

  exitFromEditMode() {
    this.editMode = false;
  }

  updateEvent(id) {
    this.afs.updateEvent(this.validateFormInput(this.eventEditorFormControl.value, id));
    this.editMode = false;
    this.closeEventEditorForm()
    }

  closeEventEditorForm() {
    this.closeEventEditor.emit();
  }

  private editXYPositionBlock() {
    const dayOfWeek = new Date(this.dateFromCell).getDay();
    if (dayOfWeek > 4 || dayOfWeek === 0) {
      this.revertCSSPosition = true;
    }
    if (this.weekNumber > 3) {
      this.upperCSSPosition = true;
    }
  }

  getErrorMessage(whatInput) {
    switch (whatInput) {
      case 'title':
        return this.eventEditorFormControl.controls['title'].hasError('required') ? 'Необходимо ввести название события' :
          this.eventEditorFormControl.controls['title'].hasError('minlength') ? 'Длина на менее 2х символов' : '';
    }
  }


  validateFormInput(eventEditorForm: CalendarEventFromForm, id?): CalendarEvent {
    this.calendarEvent = {
      date: this.dateFromCell,
      title: eventEditorForm.title,
      description: eventEditorForm.eventDescription,
      members: eventEditorForm.eventMembers,
      googleCalendarEvent: false,
    };
    if (id) {
      this.calendarEvent.id = id
    }
    return this.calendarEvent;
  }

}
