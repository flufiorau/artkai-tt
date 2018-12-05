import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CalendarService} from './calendar.service';
import {AddEventQuickComponent} from '../components/add-event-quick/add-event-quick.component';
import {DateSelectorComponent} from '../components/date-selector/date-selector.component';
import {EventEditorComponent} from '../components/event-editor/event-editor.component';
import {FullMonthComponent} from '../components/full-month/full-month.component';
import {OneDayComponent} from '../components/one-day/one-day.component';
import {SearcherComponent} from '../components/searcher/searcher.component';
import {SearchAutocompleteItemComponent} from '../components/search-autocomplete-item/search-autocomplete-item.component';
import {TableRowComponent} from '../components/table-row/table-row.component';
import {registerLocaleData} from '@angular/common';
import localeUa from '@angular/common/locales/ru-UA';

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
    TableRowComponent
  ],
  imports: [
    CommonModule,
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
    TableRowComponent
  ]
})
export class CalendarModule {
}
