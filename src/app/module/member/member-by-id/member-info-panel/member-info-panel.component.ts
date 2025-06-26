import {Component, Input} from "@angular/core";
import {LicenceTileComponent} from "../../../../components/iracing/licence-tile/licence-tile.component";
import {TranslatePipe} from "@ngx-translate/core";
import {LocalizedDatePipe} from "../../../../services/pipe/localized-date.pipe";
import {BoxComponent} from "../../../../components/cosmetics/box/box.component";
import {Member} from "../../../../services/iracing-entities";
import {FlagComponent} from "../../../../components/cosmetics/flag/flag.component";

@Component({
  standalone: true,
  selector: "isard-member-info-panel",
  imports: [
    LicenceTileComponent,
    TranslatePipe,
    LocalizedDatePipe,
    BoxComponent,
    FlagComponent
  ],
  templateUrl: "./member-info-panel.component.html",
  styleUrl: "./member-info-panel.component.scss"
})
export class MemberInfoPanelComponent {
  @Input() member!: Member;
}
