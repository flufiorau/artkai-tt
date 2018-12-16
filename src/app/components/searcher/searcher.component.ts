import {Component, ElementRef, HostListener, Input, OnInit} from '@angular/core';
import {SearchService} from '@app/core/search.service';
import {FireBaseEvent} from '@app/core/interfaces';
import {FirebaseService} from '@app/core/firebase.service';
import {DateSelectorComponent} from '@app/components/date-selector/date-selector.component';


@Component({
  selector: 'app-searcher',
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.css']
})
export class SearcherComponent implements OnInit {

  searchResults: FireBaseEvent[];
  searcher_input = '';
  @Input() dateSelectorComponent: DateSelectorComponent;

  constructor(private searchService: SearchService,
              public elementRef: ElementRef,
              private afs: FirebaseService) {
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
    this.afs.getAllEventsBySearch()
      .subscribe(
        (res: FireBaseEvent[]) => {
          if (this.searcher_input) {
            this.searchResults = res.filter(
              data =>
                (data.title.toLowerCase().indexOf(this.searcher_input.toLowerCase()) !== -1) ||
                (data.members.toLowerCase().indexOf(this.searcher_input.toLowerCase()) !== -1) ||
                (data.description.toLowerCase().indexOf(this.searcher_input.toLowerCase()) !== -1)
            );
          }
        });
  }

  clearThis() {
    this.searcher_input = '';
    this.searchResults = undefined;
  }
}
