import {Component, EventEmitter, Input, Output} from "@angular/core";
import {MemberScreenDisplay} from "../member-by-id.component";
import {TranslatePipe} from "@ngx-translate/core";
import {BoxComponent} from "../../../../components/cosmetics/box/box.component";
import {EventType} from "../../../../services/iracing-entities";

export interface MemberParameters {
  year: number,
  quarter: number,
  eventType: EventType[]
}

@Component({
  standalone: true,
  selector: "isard-member-parameter-panel",
  imports: [TranslatePipe, BoxComponent],
  templateUrl: "./member-screen-selector.component.html",
  styleUrl: "./member-screen-selector.component.scss"
})
export class MemberScreenSelectorComponent {
  @Input() currentScreenDisplay!: MemberScreenDisplay | undefined;
  @Output() screen = new EventEmitter<MemberScreenDisplay>();
  @Output() parameters = new EventEmitter<MemberParameters>();

  protected readonly MemberScreenDisplay = MemberScreenDisplay;

  changeScreen(screen: MemberScreenDisplay): void {
    this.screen.emit(screen);
  }
}
