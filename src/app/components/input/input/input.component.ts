import {Component, EventEmitter, inject, Input, Output} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";

@Component({
  standalone: true,
  selector: "isard-input",
  imports: [],
  templateUrl: "./input.component.html",
  styleUrl: "./input.component.scss"
})
export class InputComponent {
  @Input() placeholder = "";
  @Input() emptyWhenChoose = false;
  @Output() searchChange = new EventEmitter<Event>();
  @Output() enterPressed = new EventEmitter<Event>();
  private readonly translateService = inject(TranslateService);

  constructor() {
    this.placeholder = this.translateService.instant("Components.Input.DefaultPlaceholder");
  }

  onSearch(event: Event): void {
    this.searchChange.emit(event);
  }

  onEnterSearch(event: Event) {
    this.enterPressed.emit(event);
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.value) {
      if (this.emptyWhenChoose) {
        inputElement.value = "";
      }
      this.searchChange.emit(event);
    }
  }
}
