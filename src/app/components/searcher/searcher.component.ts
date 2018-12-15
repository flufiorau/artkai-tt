import {Component, OnInit} from '@angular/core';
import {SearchService} from '@app/core/search.service';
import {FireBaseEvent} from '@app/core/interfaces';
import {FirebaseService} from '@app/core/firebase.service';


@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.css']
})
export class SearcherComponent implements OnInit {

  searchResults: FireBaseEvent[];
  searcher_input = '';

  constructor(private searchService: SearchService,
              private afs: FirebaseService) {
  }

  ngOnInit() {
    this.afs.searchDataSource.subscribe(
      (searchDataSource: FireBaseEvent[]) => this.searchResults = searchDataSource
    );
  }

  searchEvents() {
    this.afs.getEventsBySearch(this.searcher_input).subscribe(
      (res: FireBaseEvent[]) => {
        this.searchResults = res;
      }
    );
    // this.searchService.getEventsFromBase(this.searcher_input.toLowerCase());
  }

  clearThis() {
    this.searcher_input = '';
    this.afs.searchDataSource.next([]);
  }
}
