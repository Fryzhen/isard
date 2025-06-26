import {Component, EventEmitter, Input, Output} from "@angular/core";

export interface CheckboxGroupItem {
  label: string,
  value: number,
}

@Component({
  standalone: true,
  selector: 'isard-checkbox-group',
  imports: [],
  templateUrl: './checkbox-group.html',
  styleUrl: './checkbox-group.scss'
})
export class CheckboxGroup {
  @Input() items: CheckboxGroupItem[] = [];
  @Input() defaultSelected = false;

  @Output() itemClick = new EventEmitter<CheckboxGroupItem>();

}
