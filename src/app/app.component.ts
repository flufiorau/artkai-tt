import {Component, OnDestroy, OnInit} from '@angular/core';
import {GoogleApiService} from 'ng-gapi';
import {GoogleCalendarService} from '@app/core/google-calendar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, OnDestroy {

  title = 'artkai-tt';

  constructor(private googleCalendarService: GoogleCalendarService,
              private googleApiService: GoogleApiService) {
  }

  ngOnInit() {
    this.googleApiService.onLoad().subscribe(
      () => this.googleCalendarService.signIn()
    );
  }

  ngOnDestroy() {
    this.googleCalendarService.signOut();
  }

}
