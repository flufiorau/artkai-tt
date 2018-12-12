import {NgModule} from '@angular/core';
import {CommonModule, registerLocaleData} from '@angular/common';
import localeUa from '@angular/common/locales/ru-UA';
import {FormsModule} from '@angular/forms';
import {CalendarService} from '@app/core/calendar.service';
import {AddEventQuickComponent} from '@app/components/add-event-quick/add-event-quick.component';
import {DateSelectorComponent} from '@app/components/date-selector/date-selector.component';
import {EventEditorComponent} from '@app/components/event-editor/event-editor.component';
import {FullMonthComponent} from '@app/components/full-month/full-month.component';
import {OneDayComponent} from '@app/components/one-day/one-day.component';
import {SearcherComponent} from '@app/components/searcher/searcher.component';
import {SearchAutocompleteItemComponent} from '@app/components/search-autocomplete-item/search-autocomplete-item.component';
import {OneWeekComponent} from '@app/components/one-week/one-week.component';

registerLocaleData(localeUa, 'ru-UA');

@NgModule({
  declarations: [
    AddEventQuickComponent,
    DateSelectorComponent,
    EventEditorComponent,
    FullMonthComponent,
    OneDayComponent,
    SearcherComponent,
    SearchAutocompleteItemComponent,
    OneWeekComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  providers: [
    CalendarService
  ],
  exports: [
    AddEventQuickComponent,
    DateSelectorComponent,
    EventEditorComponent,
    FullMonthComponent,
    OneDayComponent,
    SearcherComponent,
    SearchAutocompleteItemComponent,
    OneWeekComponent
  ]
})
export class CalendarModule {
}
