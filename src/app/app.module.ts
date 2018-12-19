import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {AppComponent} from '@app/app.component';
import {CalendarModule} from '@app/core/calendar.module';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {
  GoogleApiModule,
  NgGapiClientConfig,
  NG_GAPI_CONFIG,
} from 'ng-gapi';
import {GoogleCalendarService} from '@app/core/google-calendar.service';

export const gapiClientConfig: NgGapiClientConfig = {
  client_id: '554680840236-ip15k1ubcc3llc7a7mqgi4mjulkncq1o.apps.googleusercontent.com',
  discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
  scope: [
    'https://www.googleapis.com/auth/calendar.readonly',
    'https://www.googleapis.com/auth/calendar',
    'https://www.googleapis.com/auth/calendar.events'
  ].join(' ')
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CalendarModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    GoogleApiModule.forRoot({
      provide: NG_GAPI_CONFIG,
      useValue: gapiClientConfig
    }),
  ],
  providers: [GoogleCalendarService,
    {provide: LOCALE_ID, useValue: 'ru-UA'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
