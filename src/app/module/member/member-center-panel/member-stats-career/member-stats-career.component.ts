import {Component, Input, OnInit} from '@angular/core';
import {Member} from '../../../../services/request-services/iracing-entities';
import {NgForOf, NgIf} from '@angular/common';
import {StatsService} from '../../../../services/request-services/stats.service';
import {CareerStats} from '../../../../services/request-services/iracing-entities';
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
export class MemberStatsCareerComponent implements OnInit {
  @Input() member!: Member;
  stats: CareerStats[] | undefined = undefined;

  constructor(
    private statsService: StatsService,
    private licenceService: LicenceService
  ) {
  }

  ngOnInit(): void {
    this.statsService.getCareerStats(this.member.cust_id).subscribe({
      next: (stats: CareerStats[]) => {
        this.stats = stats;
      }
    });
  }

  getIcon(category_id: number) {
    return this.licenceService.getLicenceIcon(category_id);
  }
}
