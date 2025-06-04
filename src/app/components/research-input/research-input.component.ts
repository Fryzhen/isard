import {Component, EventEmitter, Output} from "@angular/core";
import {InputComponent} from "../input/input.component";

@Component({
  standalone: true,
  selector: "isard-research-input",
  imports: [
    InputComponent
  ],
  templateUrl: "./research-input.component.html",
  styleUrl: "./research-input.component.scss"
})
export class ResearchInputComponent {
  @Output() research = new EventEmitter<string>();
  private input: HTMLInputElement | undefined;

  onSearch() {
    if (this.input) {
      this.research.emit(this.input.value);
    }
  }

  onSearchChange($event: Event) {
    const inputComponent = $event.target as HTMLInputElement;
    if (inputComponent) {
      this.input = inputComponent;
    }
  }
}
