import {Component, EventEmitter, Input, Output} from "@angular/core";

export interface RadioGroupItem {
  label: string,
  value: number,
}

@Component({
  standalone: true,
  selector: "isard-radio-group",
  imports: [],
  templateUrl: "./radio-group.component.html",
  styleUrl: "./radio-group.component.scss"
})
export class RadioGroupComponent {
  @Input() items: RadioGroupItem[] = [];

  @Output() itemClick = new EventEmitter<number>();

}
