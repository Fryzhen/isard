import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'isard-input',
  imports: [],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent {
  @Input() placeholder: string = '';
  @Output() searchChange = new EventEmitter<Event>();
  @Output() enterPressed = new EventEmitter<Event>();

  constructor(
    private translateService: TranslateService,
  ) {
    this.translateService.get('Components.Input.DefaultPlaceholder').subscribe((text: string) => {
      this.placeholder = text;
    });
  }

  onSearch(event: Event): void {
    this.searchChange.emit(event);
  }

  onEnterSearch(event: Event) {
    this.enterPressed.emit(event);
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.value) {
      inputElement.value = '';
      this.searchChange.emit(event);
    }
  }
}
