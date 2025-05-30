import {Component, Input, OnInit} from '@angular/core';
import {Member} from '../../../../services/request-services/iracing-entities';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import {StatsService} from '../../../../services/request-services/stats.service';
import {CareerStats} from '../../../../services/request-services/iracing-entities';
import {IconComponent} from '../../../../components/icon/icon.component';
import {LicenceService} from '../../../../services/app-services/licence.service';
import {LoadingScreenComponent} from '../../../../components/loading-screen/loading-screen.component';

@Component({
  standalone: true,
  selector: 'isard-member-stats-global',
  imports: [
    NgForOf,
    NgIf,
    IconComponent,
    LoadingScreenComponent
  ],
  templateUrl: './member-stats-global.component.html',
  styleUrl: './member-stats-global.component.scss'
})
export class MemberStatsGlobalComponent implements OnInit {
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
