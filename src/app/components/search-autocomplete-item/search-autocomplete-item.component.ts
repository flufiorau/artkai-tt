import {Component, Input, OnInit} from '@angular/core';
import {CalendarEvent} from '../../core/interfaces';

@Component({
  selector: 'app-search-autocomplete-item',
  templateUrl: './search-autocomplete-item.component.html',
  styleUrls: ['./search-autocomplete-item.component.css']
})
export class SearchAutocompleteItemComponent implements OnInit {

  @Input() calendarEvent: CalendarEvent;
  constructor() { }

  ngOnInit() {
  }

}
