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

  getValueAsDate(value: string | Date | number) {
    return value as Date;
  }

  sortColumn(i: number) {
    if (this.rows?.forEach((cell) => {
      return typeof cell[i].value === "number"
    })) {
      this.rows = this.rows?.sort((a, b) => +a[i].value - +b[i].value)
    }
  }
}
