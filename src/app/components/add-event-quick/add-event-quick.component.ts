import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/ru';
import {FireBaseEvent} from '@app/core/interfaces';
import {FirebaseService} from '@app/core/firebase.service';

@Component({
  selector: 'app-add-event-quick',
  templateUrl: `./add-event-quick.component.html`,
  styleUrls: ['./add-event-quick.component.css']
})
export class AddEventQuickComponent implements OnInit {

  stringValuesNewCalendarEvent: string;
  inputTextIsNotValid = false;
  parseErrors: string;
  label: string;
  quickAddEventDialogOpen: boolean;
  newEvent: FireBaseEvent;

  constructor(private afs: FirebaseService) {
  }

  ngOnInit() {
  }

  validateInputMask() {
    this.newEvent = {date: undefined, title: '', members: [], description: ''};

    const inputSplitArray = this.stringValuesNewCalendarEvent.split(',');
    this.parseErrors = '';

    if (inputSplitArray.length < 1) {
      this.label = '* 5 Марта, ';
      return;
    }
    const dayAndMonthFromString = inputSplitArray[0].split(' ');

    if (!moment(dayAndMonthFromString[1], 'MMMM').isValid()) {
      this.parseErrors = 'Ошибка в месяце';
      return;
    }
    if (!moment(dayAndMonthFromString[0], 'DD').isValid()) {
      this.parseErrors = 'Ошибка в дате';
      return;
    }
    if (inputSplitArray.length < 2) {
      this.label = '* 5 Марта, Событие, ';
      return;
    }
    if (inputSplitArray[1].length < 2) {
      this.label = 'событие не менее 2-х символов';
      return;
    }
    if (inputSplitArray.length < 3) {
      this.label = '* 5 Марта, Событие, Описание';
      return;
    }
    if (inputSplitArray[2].length < 2) {
      this.parseErrors = 'Описание события не менее 2х символов';
      return;
    }
    const dateFromInputData = moment()
      .month(dayAndMonthFromString[1])
      .date(parseFloat(dayAndMonthFromString[0]))
      .startOf('day')
      .toDate();
    const titleFromString = inputSplitArray[1];
    const descriptionFromString = inputSplitArray[2];
    const dateNow = new Date();

    if (dateNow > dateFromInputData) {
      dateFromInputData.setFullYear(dateNow.getFullYear() + 1);
    }

    this.newEvent.date = dateFromInputData.getTime();
    this.newEvent.title = titleFromString;
    this.newEvent.description = descriptionFromString;
  }

  createNewCalendarEvent() {
    console.log(this.newEvent);
    this.afs.addEvent(this.newEvent);
    this.quickAddEventDialogOpen = false;
  }
}
