import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgForOf, NgIf, NgStyle} from '@angular/common';

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
    NgStyle
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
    if (inputElement.value.length >= 1) {
      this.debounceTimeout = setTimeout(() => {
        this.searchChange.emit(inputElement.value);
      }, 500);
    } else {
      this.items = [];
    }
  }

  onItemClick(id: number): void {
    this.items = []; // Clear items after selection
    this.itemClick.emit(id);
  }
}
