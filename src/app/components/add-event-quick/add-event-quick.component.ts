import {Component, OnInit} from '@angular/core';
import {EventsService} from '@app/core/events.service';
import * as moment from 'moment';
import 'moment/locale/ru';
import {CalendarEvent} from '@app/core/interfaces';

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
  newEvent = new CalendarEvent();

  constructor(private eventsService: EventsService) {
  }

  ngOnInit() {
  }

  validateInputMask() {
    const inputData = this.stringValuesNewCalendarEvent;
    const dateNow = new Date();
    let dayAndMonthFromString;
    let hoursAndMinutesFromString;
    let dateFromInputData: Date;
    const inputSplitArray = inputData.split(',');
    this.parseErrors = '';

    if (inputSplitArray.length !== 3) {
      this.label = '* 5 Марта, 14:00, День Рождения';
      return;
    }
    if (inputSplitArray[2].length < 2) {
      this.label = 'событие не менее 2-х символов';
      return;
    }
    dayAndMonthFromString = inputSplitArray[0].split(' ');
    if (!moment(dayAndMonthFromString[1], 'MMMM').isValid()) {
      this.parseErrors = 'Ошибка в месяце';
      return;
    }
    if (!moment(dayAndMonthFromString[0], 'DD').isValid()) {
      this.parseErrors = 'Ошибка в дате';
      return;
    }
    if (inputSplitArray[1].split(':').length < 2 || !moment(inputSplitArray[1], 'hh:mm').isValid()) {
      this.parseErrors = 'Ошибка времени';
      return;
    }

    hoursAndMinutesFromString = inputSplitArray[1].split(':');

    dateFromInputData = moment()
      .month(dayAndMonthFromString[1])
      .date(dayAndMonthFromString[0])
      .hours(hoursAndMinutesFromString[0])
      .minutes(hoursAndMinutesFromString[1])
      .toDate();
    if (dateNow > dateFromInputData) {
      dateFromInputData.setFullYear(dateNow.getFullYear() + 1);
    }
    this.newEvent.date = dateFromInputData;
    this.newEvent.description = inputSplitArray[2];
  }

  createNewCalendarEvent() {
    this.eventsService.createNewCalendarEvent(this.newEvent).subscribe(
      (res) => console.log(res)
    );
  }
}
