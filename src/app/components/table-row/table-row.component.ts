import {Component, Input, OnInit} from '@angular/core';
import {Week} from '../../core/interfaces';

@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.css']
})
export class TableRowComponent implements OnInit {

  @Input() oneWeekData: Week;
  @Input() columns: string[];
  @Input() firstRow: boolean;
  @Input() weekNumber: number;

  constructor() {
  }

  ngOnInit() {
  }

}
