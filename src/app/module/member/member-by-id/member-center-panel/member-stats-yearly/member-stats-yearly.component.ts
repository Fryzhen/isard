import {Component, inject, Input, OnInit} from "@angular/core";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import {BoxComponent} from "../../../../../components/box/box.component";
import {StatYearly} from "../../../../../services/iracing-entities";
import {StatsTableComponent} from "../stats-table/stats-table.component";
import {LoggerService} from "../../../../../services/app-services/logger.service";
import {NotificationService} from "../../../../../services/app-services/notification.service";
import {StatsService} from "../../../../../services/request-services/stats.service";
import {LoadingScreenComponent} from "../../../../../components/loading-screen/loading-screen.component";

@Component({
  standalone: true,
  selector: "isard-member-stats-yearly",
  imports: [
    TranslatePipe,
    BoxComponent,
    StatsTableComponent,
    LoadingScreenComponent,
  ],
  templateUrl: "./member-stats-yearly.component.html",
  styleUrl: "./member-stats-yearly.component.scss"
})
export class MemberStatsYearlyComponent implements OnInit {
  @Input() cust_id!: number;
  years?: number[] = undefined;
  statByYear: Record<number, StatYearly[]> = {};
  private readonly loggerService = inject(LoggerService);
  private readonly notificationService = inject(NotificationService);
  private readonly translateService = inject(TranslateService);
  private readonly statsService = inject(StatsService);

  ngOnInit(): void {
    this.statsService.getYearlyStats(this.cust_id).subscribe({
      next: (stats: StatYearly[]) => {
        this.years = [...new Set(stats.map((s: StatYearly) => s.year).sort((a, b) => b - a))];
        this.statByYear = {};
        this.years.forEach(year => {
          this.statByYear[year] = this.getStatYearly(year, stats);
        });
      },
      error: (error: string) => {
        this.notificationService.error(this.translateService.instant("Member.Errors.ImpossibleGetData"));
        this.loggerService.error(error);
      }
    });
  }

  getStatYearly(year: number, stats: StatYearly[]): StatYearly[] {
    return stats.filter((s: StatYearly) => s.year === year) ?? [];
  }
}
