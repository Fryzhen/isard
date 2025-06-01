import {Component, Input} from '@angular/core';
import {CareerStats} from '../../../../services/request-services/iracing-entities';
import {NgForOf, NgIf} from '@angular/common';
import {IconComponent} from '../../../../components/icon/icon.component';
import {LicenceService} from '../../../../services/app-services/licence.service';
import {LoadingScreenComponent} from '../../../../components/loading-screen/loading-screen.component';
import {TranslatePipe} from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'isard-member-stats-career',
  imports: [
    NgForOf,
    NgIf,
    IconComponent,
    LoadingScreenComponent,
    TranslatePipe
  ],
  templateUrl: './member-stats-career.component.html',
  styleUrl: './member-stats-career.component.scss'
})
export class MemberStatsCareerComponent {
  @Input() stats: CareerStats[] | undefined = undefined;

  constructor(
    private licenceService: LicenceService
  ) {
  }

  getIcon(category_id: number) {
    return this.licenceService.getLicenceIcon(category_id);
  }
}
