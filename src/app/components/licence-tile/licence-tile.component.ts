import {Component, Input} from "@angular/core";
import {NgClass, NgIf} from "@angular/common";
import {License} from "../../services/request-services/iracing-entities";
import {LicenceService} from "../../services/app-services/licence.service";
import {IconComponent} from "../icon/icon.component";
import {TranslatePipe} from "@ngx-translate/core";

@Component({
  standalone: true,
  selector: "isard-licence-tile",
  imports: [
    NgClass,
    NgIf,
    IconComponent,
    TranslatePipe
  ],
  templateUrl: "./licence-tile.component.html",
  styleUrl: "./licence-tile.component.scss"
})
export class LicenceTileComponent {
  @Input({required: true}) licence!: License;

  constructor(
    private licenceService: LicenceService
  ) {
  }

  getLicenceIcon(): string {
    return this.licenceService.getLicenceIcon(this.licence.category_id);
  }

  getLicenceColor(): string {
    return this.licenceService.getLicenceColor(this.licence.group_id);
  }
}
