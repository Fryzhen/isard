import {Component, EventEmitter, Input, Output} from "@angular/core";

export interface PicklistItem {
  text: string,
  id: number,
}

@Component({
  standalone: true,
  selector: "isard-item-picklist",
  imports: [],
  templateUrl: "./item-picklist.component.html",
  styleUrl: "./item-picklist.component.scss"
})
export class ItemPicklistComponent {
  @Input() label!: string;
  @Input() items: PicklistItem[] = [];

  @Output() itemClick = new EventEmitter<number>();
}
