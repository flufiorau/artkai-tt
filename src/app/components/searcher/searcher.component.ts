import {Component, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {CalendarEvent} from '@app/core/interfaces';
import {DateSelectorComponent} from '@app/components/date-selector/date-selector.component';
import {CalendarService} from '@app/core/calendar.service';


@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.css']
})
export class SearcherComponent implements OnInit {

  searchResults: CalendarEvent[];
  searcher_input = '';
  @Input() dateSelectorComponent: DateSelectorComponent;

  constructor(private calendarService: CalendarService,
              public elementRef: ElementRef) {
  }

  @HostListener('document:click', ['$event', '$event.target'])
  onClick(event: MouseEvent, targetElement: HTMLElement) {
    if (!targetElement) {
      return;
    }
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);

    if (!clickedInside) {
      this.clearThis();
    }
  }

  ngOnInit() {
  }

  searchEvents() {
    if (!this.searcher_input.length) {
      this.searchResults = undefined;
      return;
    }
    if (this.searcher_input) {
      this.searchResults = this.calendarService.eventsCalendarDataSource.filter(
        data =>
          (data.title && data.title.toLowerCase().indexOf(this.searcher_input.toLowerCase()) !== -1) ||
          (data.members && data.members.toLowerCase().indexOf(this.searcher_input.toLowerCase()) !== -1) ||
          (data.description && data.description.toLowerCase().indexOf(this.searcher_input.toLowerCase()) !== -1)
      );
    }
  }

  clearThis() {
    this.searcher_input = '';
    this.searchResults = undefined;
  }
}
