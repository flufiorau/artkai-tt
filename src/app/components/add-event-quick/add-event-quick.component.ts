import { Component, OnInit } from '@angular/core';
import {EventsService} from '../../core/events.service';

@Component({
  selector: 'app-add-event-quick',
  templateUrl: './add-event-quick.component.html',
  styleUrls: ['./add-event-quick.component.css']
})
export class AddEventQuickComponent implements OnInit {

  stringValuesNewCalendarEvent: string;
  inputTextIsNotValid = false;

  constructor(private eventsService: EventsService) { }

  ngOnInit() {
    this.stringValuesNewCalendarEvent = '5 Mar, 14:00, День Рождение';
  }



  createNewCalendarEvent() {
    this.eventsService.createNewCalendarEvent(this.stringValuesNewCalendarEvent).subscribe(
      (res) => console.log(res)
    );
  }
}
