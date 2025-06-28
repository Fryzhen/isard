import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";

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
export class CheckboxGroupComponent implements OnInit {
  @Input() items: CheckboxGroupItem[] = [];
  @Input() selected: CheckboxGroupItem[] = [];

  @Output() itemClick = new EventEmitter<CheckboxGroupItem>();

  ngOnInit() {
    console.log(this.selected)
  }
}
