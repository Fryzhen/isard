import {Component, EventEmitter, inject, Input, Output} from "@angular/core";
import {NgStyle} from "@angular/common";
import {InputComponent} from "../../input/input.component";
import {TranslateService} from "@ngx-translate/core";

interface PickListItems {
  name: string;

  id: number;
}

@Component({
  standalone: true,
  selector: "isard-search-picklist",
  imports: [
    NgStyle,
    InputComponent
  ],
  templateUrl: "./search-picklist.component.html",
  styleUrl: "./search-picklist.component.scss"
})
export class SearchPicklistComponent {
  @Input() items: PickListItems[] = [];
  @Input() placeholder = "";
  @Output() searchChange = new EventEmitter<string>();
  @Output() itemClick = new EventEmitter<number>();
  private readonly translateService = inject(TranslateService);
  private debounceTimeout: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    this.placeholder = this.translateService.instant("Components.Input.DefaultPlaceholder");
  }

  onSearch(event: Event): void {
    const inputElement = event.target as HTMLInputElement;

    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
    if (inputElement.value.length > 0) {
      this.debounceTimeout = setTimeout(() => {
        this.searchChange.emit(inputElement.value);
      }, 500);
    } else {
      this.searchChange.emit(inputElement.value);
    }
  }

  onEnterPressed() {
    if (this.items.length > 0) {
      this.onItemClick(this.items[0].id);
    }
  }

  onItemClick(id: number): void {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
    this.items = [];
    this.itemClick.emit(id);
  }

  canBeEmptied() {
    return this.items.length > 0;
  }
}
