import {Component, EventEmitter, Input, Output} from "@angular/core";

export interface CheckboxGroupItem {
  label: string,
  value: number,
}

@Component({
  standalone: true,
  selector: "isard-checkbox-group",
  imports: [],
  templateUrl: "./checkbox-group.component.html",
  styleUrl: "./checkbox-group.component.scss"
})
export class CheckboxGroupComponent {
  @Input() items: CheckboxGroupItem[] = [];
  @Input() defaultSelected = false;

  @Output() itemClick = new EventEmitter<CheckboxGroupItem>();

}
