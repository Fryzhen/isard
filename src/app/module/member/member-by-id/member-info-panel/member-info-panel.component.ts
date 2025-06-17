import {Component, Input} from "@angular/core";
import {LicenceTileComponent} from "../../../../components/licence-tile/licence-tile.component";
import {TranslatePipe} from "@ngx-translate/core";
import {LocalizedDatePipe} from "../../../../services/pipe/localized-date.pipe";
import {BoxComponent} from "../../../../components/box/box.component";
import {Member} from "../../../../services/iracing-entities";

@Component({
  standalone: true,
  selector: "isard-member-info-panel",
  imports: [
    LicenceTileComponent,
    TranslatePipe,
    LocalizedDatePipe,
    BoxComponent
  ],
  templateUrl: "./member-info-panel.component.html",
  styleUrl: "./member-info-panel.component.scss"
})
export class MemberInfoPanelComponent {
  @Input() member!: Member;
}
