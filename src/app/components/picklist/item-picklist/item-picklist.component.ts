import {Component, EventEmitter, Input, Output} from "@angular/core";
import {NgForOf} from "@angular/common";

export interface PicklistItem {
  text: string,
  id: number,
}

@Component({
  standalone: true,
  selector: "isard-item-picklist",
  imports: [NgForOf],
  templateUrl: "./item-picklist.component.html",
  styleUrl: "./item-picklist.component.scss"
})
export class ItemPicklistComponent {
  @Input() label!: string;
  @Input() items: PicklistItem[] = [];

  @Output() itemClick = new EventEmitter<number>();
}
