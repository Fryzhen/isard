import {Component, Input} from '@angular/core';
import {NgClass, NgForOf, NgIf} from '@angular/common';

export interface TableHeader {
  value: string | Date;
  isCenter?: boolean;
}

export interface TableRow {
  value: string | Date;
  isPositive?: boolean;
  isNegative?: boolean;
  isCenter?: boolean;
  isButton?: boolean;
  onClick?: (id: number) => number;
}

@Component({
  standalone: true,
  selector: 'isard-table',
  imports: [
    NgForOf,
    NgClass,
    NgIf
  ],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  @Input() rows!: TableRow[][]
  @Input() header!: TableHeader[]
}
