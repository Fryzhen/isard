import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf, NgIf, NgStyle} from '@angular/common';
import {InputComponent} from '../input/input.component';

interface PickListItems {
  name: string;
  id: number;
}

@Component({
  standalone: true,
  selector: 'isard-picklist',
  imports: [
    NgForOf,
    NgIf,
    NgStyle,
    InputComponent
  ],
  templateUrl: './picklist.component.html',
  styleUrl: './picklist.component.scss'
})
export class PicklistComponent {
  @Input() items: PickListItems[] = [];
  @Input() placeholder: string = 'Search...';
  @Output() searchChange = new EventEmitter<string>();
  @Output() itemClick = new EventEmitter<number>();

  private debounceTimeout: ReturnType<typeof setTimeout> | null = null;

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
      this.onItemClick(this.items[0].id)
    }
  }

  onItemClick(id: number): void {
    if (this.debounceTimeout) {
      clearTimeout(this.debounceTimeout);
    }
    this.items = [];
    this.itemClick.emit(id);
  }
}
