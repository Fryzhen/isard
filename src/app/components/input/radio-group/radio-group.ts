import {Component, EventEmitter, Input, Output} from "@angular/core";

export interface RadioGroupItem {
  label: string,
  value: number,
}

@Component({
  standalone: true,
  selector: "isard-radio-group",
  imports: [],
  templateUrl: "./radio-group.html",
  styleUrl: "./radio-group.scss"
})
export class RadioGroup {
  @Input() items: RadioGroupItem[] = [];

  @Output() itemClick = new EventEmitter<number>();

}
