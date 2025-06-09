import {Component, inject, Input} from "@angular/core";
import {NgClass} from "@angular/common";
import {LicenceService} from "../../services/app-services/licence.service";
import {IconComponent} from "../icon/icon.component";
import {TranslatePipe} from "@ngx-translate/core";
import {License} from "../../services/iracing-entities";

@Component({
  standalone: true,
  selector: "isard-licence-tile",
  imports: [
    NgClass,
    IconComponent,
    TranslatePipe
  ],
  templateUrl: "./licence-tile.component.html",
  styleUrl: "./licence-tile.component.scss"
})
export class LicenceTileComponent {
  @Input() licence!: License;
  private readonly licenceService = inject(LicenceService);

  getLicenceIcon(): string {
    return this.licenceService.getLicenceIcon(this.licence.category_id);
  }

  getLicenceColor(): string {
    return this.licenceService.getLicenceColor(this.licence.group_id);
  }
}
