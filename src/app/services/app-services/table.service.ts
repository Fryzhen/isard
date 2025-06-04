import {Injectable} from "@angular/core";

export enum TableCellType {
  TEXT = "text", DATE = "date", BUTTON = "button", ICON = "icon"
}

export interface TableHeader {
  value: string | Date;
  isCenter?: boolean;
}

export interface TableCell {
  type?: TableCellType;
  value: string | Date | number;
  isPositive?: boolean;
  isNegative?: boolean;
  isCenter?: boolean;
  onClick?: (obj: never) => void;
  dateFormat?: string;
  height?: number;
  width?: number;
}

@Injectable({
  providedIn: "root"
})
export class TableService {

  public createHeader(value: string | Date, isCenter?: boolean): TableHeader {
    return {
      value, isCenter
    };
  }

  public createCell(value: string | number, isCenter?: boolean, isPositive?: boolean, isNegative?: boolean): TableCell {
    return {
      type: TableCellType.TEXT, value, isCenter, isPositive, isNegative,
    };
  }

  public createDate(value: Date, dateFormat: string, isCenter?: boolean): TableCell {
    return {
      type: TableCellType.DATE, value, dateFormat, isCenter,
    };
  }

  public createButton(value: string, onClick: (obj: never) => void, isCenter?: boolean): TableCell {
    return {
      type: TableCellType.BUTTON, value, isCenter, onClick
    };
  }

  public createIcon(value: string, height: number, width: number, isCenter?: boolean): TableCell {
    return {
      type: TableCellType.ICON, value, height, width, isCenter
    };
  }

}
