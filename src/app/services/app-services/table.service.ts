import {Injectable} from "@angular/core";

export enum TableCellType {
  TEXT = "text", DATE = "date", BUTTON = "button", ICON = "icon"
}

export interface TableHeader {
  value: string;
  sortable: boolean;
  classes?: Record<string, boolean>;
}

export interface TableCell {
  type?: TableCellType;
  value: string | Date | number;
  classes?: Record<string, boolean>;
  onClick?: (obj: any) => void;
  dateFormat?: string;
  height?: number;
  width?: number;
}

@Injectable({
  providedIn: "root"
})
export class TableService {

  public createHeader(value: string, sortable: boolean = false, classes?: Record<string, boolean>): TableHeader {
    return {
      value, sortable, classes
    };
  }

  public createCell(value: string | number, classes?: Record<string, boolean>): TableCell {
    return {
      type: TableCellType.TEXT, value, classes
    };
  }

  public createDate(value: Date, dateFormat: string, classes?: Record<string, boolean>): TableCell {
    return {
      type: TableCellType.DATE, value, dateFormat, classes,
    };
  }

  public createButton(value: string, onClick: (obj: any) => void, classes?: Record<string, boolean>): TableCell {
    return {
      type: TableCellType.BUTTON, value, onClick, classes
    };
  }

  public createIcon(value: string, height: number, width: number, classes?: Record<string, boolean>): TableCell {
    return {
      type: TableCellType.ICON, value, height, width, classes
    };
  }

}
