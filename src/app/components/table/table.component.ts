import {Component, Input} from "@angular/core";
import {NgClass} from "@angular/common";
import {TableCell, TableCellType, TableHeader} from "../../services/app-services/table.service";
import {LocalizedDatePipe} from "../../services/app-services/localized-date.pipe";
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
  @Input() rows!: TableCell[][];
  @Input() header!: TableHeader[];
  protected readonly TableCellType = TableCellType;

  getValueAsDate(value: string | Date | number) {
    return value as Date;
  }
}
