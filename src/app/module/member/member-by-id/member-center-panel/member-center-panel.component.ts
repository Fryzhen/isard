import {Component, Input} from "@angular/core";
import {MemberScreenDisplay} from "../member-by-id.component";
import {MemberLastRacesComponent} from "./member-last-races/member-last-races.component";
import {MemberParameters} from "../member-parameter-panel/member-parameter-panel.component";
import {Member} from "../../../../services/iracing-entities";
import {MemberStatsComponent} from "./member-stats/member-stats.component";
import {MemberAllRacesComponent} from "./member-all-races/member-all-races.component";

@Component({
  standalone: true,
  selector: "isard-member-center-panel",
  imports: [MemberLastRacesComponent, MemberStatsComponent, MemberAllRacesComponent],
  templateUrl: "./member-center-panel.component.html",
  styleUrl: "./member-center-panel.component.scss"
})
export class MemberCenterPanelComponent {
  @Input() member!: Member;
  @Input() parameters!: MemberParameters;
  @Input() curentScreenDisplay!: MemberScreenDisplay;
  protected readonly MemberScreenDisplay = MemberScreenDisplay;
}
