import {Component, Input, OnInit} from '@angular/core';
import {Member, YearStats} from '../../../services/request-services/iracing-entities';
import {IconComponent} from '../../../components/icon/icon.component';
import {NgForOf, NgIf} from '@angular/common';
import {StatsService} from '../../../services/request-services/stats.service';
import {LicenceService} from '../../../services/app-services/licence.service';

@Component({
  standalone: true,
  selector: 'isard-member-stats-yearly',
  imports: [
    IconComponent,
    NgForOf,
    NgIf
  ],
  templateUrl: './member-stats-yearly.component.html',
  styleUrl: './member-stats-yearly.component.scss'
})
export class MemberStatsYearlyComponent implements OnInit {
  @Input() member!: Member;
  stats: YearStats[] | undefined = undefined;
  years: number[] = [];

  constructor(
    private statsService: StatsService,
    private licenceService: LicenceService
  ) {
  }

  ngOnInit(): void {
    this.statsService.getYearlyStats(this.member.cust_id).subscribe({
      next: (stats: YearStats[]) => {
        this.stats = stats;
        this.years = [...new Set(stats.map((s: YearStats) => s.year).sort((a, b) => b - a))];
      }
    });
  }

  getIcon(category_id: number) {
    return this.licenceService.getLicenceIcon(category_id);
  }

  getYearStats(year: number): YearStats[]{
    return this.stats?.filter((s: YearStats) => s.year === year) ?? [];
  }
}
