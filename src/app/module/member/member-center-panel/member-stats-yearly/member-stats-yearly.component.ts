import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {YearStats} from '../../../../services/request-services/iracing-entities';
import {IconComponent} from '../../../../components/icon/icon.component';
import {NgForOf, NgIf} from '@angular/common';
import {LicenceService} from '../../../../services/app-services/licence.service';
import {LoadingScreenComponent} from '../../../../components/loading-screen/loading-screen.component';
import {TranslatePipe} from '@ngx-translate/core';
import {BoxComponent} from '../../../../components/box/box.component';

@Component({
  standalone: true,
  selector: 'isard-member-stats-yearly',
  imports: [
    IconComponent,
    NgForOf,
    NgIf,
    LoadingScreenComponent,
    TranslatePipe,
    BoxComponent
  ],
  templateUrl: './member-stats-yearly.component.html',
  styleUrl: './member-stats-yearly.component.scss'
})
export class MemberStatsYearlyComponent implements OnChanges {
  @Input() stats: YearStats[] | undefined = undefined;
  years: number[] = [];

  constructor(
    private licenceService: LicenceService
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    this.years = [...new Set(this.stats?.map((s: YearStats) => s.year).sort((a, b) => b - a))]
  }

  getIcon(category_id: number) {
    return this.licenceService.getLicenceIcon(category_id);
  }

  getYearStats(year: number): YearStats[] {
    return this.stats?.filter((s: YearStats) => s.year === year) ?? [];
  }
}
