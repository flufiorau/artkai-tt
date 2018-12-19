import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CalendarEvent} from '@app/core/interfaces';
import {DateSelectorComponent} from '@app/components/date-selector/date-selector.component';

@Component({
  selector: 'app-search-autocomplete-item',
  templateUrl: './search-autocomplete-item.component.html',
  styleUrls: ['./search-autocomplete-item.component.css'],
  providers: [DateSelectorComponent]
})
export class SearchAutocompleteItemComponent implements OnInit {

  @Input() calendarEvent: CalendarEvent;
  @Input() dateSelectorComponent: DateSelectorComponent;
  @Output() clearResults = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  goToThisEventDate() {
    this.dateSelectorComponent.loadMonthWithEventDate(this.calendarEvent.date);
    this.clearResults.emit();
  }
}
