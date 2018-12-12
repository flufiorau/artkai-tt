import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {AppComponent} from '@app/app.component';
import {CalendarModule} from '@app/core/calendar.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    CalendarModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'ru-UA' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
