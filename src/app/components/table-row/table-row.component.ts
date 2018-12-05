import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-table-row',
  templateUrl: './table-row.component.html',
  styleUrls: ['./table-row.component.css']
})
export class TableRowComponent implements OnInit {

  @Input() cellData: any;
  @Input() columns: string[];
  @Input() firstRow: boolean;

  constructor() {
  }

  ngOnInit() {
  }

}
