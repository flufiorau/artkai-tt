import {Component, Input, OnInit} from '@angular/core';
import {CalendarEvent} from '../../core/interfaces';

@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.css']
})
export class TableRowComponent implements OnInit {

  @Input() cellData: any;
  @Input() columns: string[];
  @Input() firstRow: boolean;

  calendarEvent: CalendarEvent = {
      date: 21132131232,
      description: 'qwerty qwerty qwerty qwerty ',
      members: ['saSAsASa', 'zxczx']};
  userClickedByDay: boolean;

  constructor() {
  }

  ngOnInit() {
  }

}
