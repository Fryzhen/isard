import {Component, EventEmitter, inject, Input, Output} from "@angular/core";
import {UuidService} from "../../../services/app-services/uuid.service";

export interface PicklistItem {
  label: string,
  value: number,
}

@Component({
  standalone: true,
  selector: "isard-item-picklist",
  imports: [],
  templateUrl: "./item-picklist.component.html",
  styleUrl: "./item-picklist.component.scss"
})
export class ItemPicklistComponent {
  @Input() label?: string = undefined;
  @Input() labelEmpty?: string = undefined;
  @Input() items: PicklistItem[] = [];
  @Output() itemClick = new EventEmitter<PicklistItem | null>();
  protected readonly uuidService = inject(UuidService);
  uuid: string = this.uuidService.generate();
}
