import {Component, Input, OnInit} from '@angular/core';
import {CalendarEvent, Week} from '@app/core/interfaces';

@Component({
  selector: 'app-one-week',
  templateUrl: './one-week.component.html',
  styleUrls: ['./one-week.component.css']
})
export class OneWeekComponent implements OnInit {

  @Input() oneWeekData: Week;
  @Input() events: CalendarEvent[];
  @Input() columns: string[];
  @Input() firstRow: boolean;
  @Input() weekNumber: number;

  constructor() {
  }

  ngOnInit() {
  }

}
