import {Component, Input} from "@angular/core";
import {NgClass} from "@angular/common";
import {TableCell, TableCellType, TableHeader} from "../../../services/app-services/table.service";
import {LocalizedDatePipe} from "../../../services/pipe/localized-date.pipe";
import {IconComponent} from "../icon/icon.component";

@Component({
  standalone: true,
  selector: "isard-table",
  imports: [
    NgClass,
    LocalizedDatePipe,
    IconComponent
  ],
  templateUrl: "./table.component.html",
  styleUrl: "./table.component.scss"
})
export class TableComponent {
  @Input() rows!: TableCell[][] | undefined;
  @Input() header!: TableHeader[] | undefined;
  protected readonly TableCellType = TableCellType;

  protected sortedColumn: number | null = null;
  protected sortAsc: boolean = true;

  getValueAsDate(value: string | Date | number) {
    return value as Date;
  }

  sortColumn(i: number) {
    if (!this.rows) return;

    // Toggle sort direction if the same column is clicked
    if (this.sortedColumn === i) {
      this.sortAsc = !this.sortAsc;
    } else {
      this.sortedColumn = i;
      this.sortAsc = true;
    }

    this.rows = [...this.rows].sort((a, b) => {
      const valA = a[i].value;
      const valB = b[i].value;

      if (typeof valA === "number" && typeof valB === "number") {
        return this.sortAsc ? valA - valB : valB - valA;
      }
      if (typeof valA === "number") {
        return this.sortAsc ? -1 : 1;
      }
      if (typeof valB === "number") {
        return this.sortAsc ? 1 : -1;
      }
      if (valA instanceof Date && valB instanceof Date) {
        return this.sortAsc ? valA.getTime() - valB.getTime() : valB.getTime() - valA.getTime();
      }
      // Fallback to string comparison
      return this.sortAsc
        ? valA.toString().localeCompare(valB.toString())
        : valB.toString().localeCompare(valA.toString());
    });
  }
}
