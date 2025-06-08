import {Component, EventEmitter, Input, Output} from "@angular/core";
import {MemberScreenDisplay} from "../member-by-id.component";
import {TranslatePipe} from "@ngx-translate/core";
import {BoxComponent} from "../../../../components/box/box.component";
import {EventType} from "../../../../services/iracing-entities";

export interface MemberParameters {
  screen: MemberScreenDisplay,
  year: number,
  quarter: number,
  eventType: EventType[]
}

@Component({
  standalone: true,
  selector: "isard-member-parameter-panel",
  imports: [
    TranslatePipe,
    BoxComponent
  ],
  templateUrl: "./member-parameter-panel.component.html",
  styleUrl: "./member-parameter-panel.component.scss"
})
export class MemberParameterPanelComponent {
  @Input() currentScreenDisplay!: MemberScreenDisplay | undefined;
  @Output() parameters = new EventEmitter<MemberParameters>();

  protected readonly MemberScreenDisplay = MemberScreenDisplay;

  changeScreen(screen: MemberScreenDisplay): void {
    this.parameters.emit({screen: screen} as MemberParameters);
  }
}
