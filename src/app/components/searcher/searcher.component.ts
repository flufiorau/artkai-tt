import {Component, OnInit} from '@angular/core';
import {SearchService} from '@app/core/search.service';
import {CalendarEvent} from '@app/core/interfaces';


@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.css']
})
export class SearcherComponent implements OnInit {

  searchResults: CalendarEvent[];
  searcher_input = '';

  constructor(private searchService: SearchService) {
  }

  ngOnInit() {
    this.searchService.searchDataSource.subscribe(
      (searchDataSource: CalendarEvent[]) => this.searchResults = searchDataSource
    );
  }

  searchEvents() {
    this.searchService.getEventsFromBase(this.searcher_input.toLowerCase());
  }

  clearThis() {
    this.searcher_input = '';
    this.searchService.searchDataSource.next([]);
  }
}
