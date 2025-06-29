import {Component, inject, Input, OnInit} from "@angular/core";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import {BoxComponent} from "../../../../../components/cosmetics/box/box.component";
import {StatCarrer, StatYearly} from "../../../../../services/iracing-entities";
import {LoggerService} from "../../../../../services/app-services/logger.service";
import {NotificationService} from "../../../../../services/app-services/notification.service";
import {StatsService} from "../../../../../services/request-services/stats.service";
import {LoadingScreenComponent} from "../../../../../components/cosmetics/loading-screen/loading-screen.component";
import {StatsTableComponent} from "./stats-table/stats-table.component";

@Component({
  standalone: true,
  selector: "isard-member-stats",
  imports: [TranslatePipe, BoxComponent, LoadingScreenComponent, StatsTableComponent],
  templateUrl: "./member-stats.component.html",
  styleUrl: "./member-stats.component.scss"
})
export class MemberStatsComponent implements OnInit {
  @Input() custId!: number;
  displayStats?: StatCarrer[] = undefined;
  statsCarrer?: StatCarrer[] = undefined;
  statsYearly: Record<number, StatYearly[]> = {};
  years?: number[] = undefined;
  private readonly loggerService = inject(LoggerService);
  private readonly notificationService = inject(NotificationService);
  private readonly translateService = inject(TranslateService);
  private readonly statsService = inject(StatsService);

  ngOnInit(): void {
    this.statsService.getCareerStats(this.custId).subscribe({
      next: (stats: StatCarrer[]) => {
        this.statsCarrer = stats;
        this.displayStats = stats;
      }, error: (error: string) => {
        this.notificationService.error(this.translateService.instant("Member.Errors.ImpossibleGetData"));
        this.loggerService.error(error);
      }
    });
    this.statsService.getYearlyStats(this.custId).subscribe({
      next: (stats: StatYearly[]) => {
        this.years = [...new Set(stats.map((s: StatYearly) => s.year).sort((a, b) => b - a))];
        this.years.forEach((year: number) => {
          this.statsYearly[year] = this.getStatYearly(year, stats);
        });
      }, error: (error: string) => {
        this.notificationService.error(this.translateService.instant("Member.Errors.ImpossibleGetData"));
        this.loggerService.error(error);
      }
    });
  }

  getStatYearly(year: number, stats: StatYearly[]): StatYearly[] {
    return stats.filter((s: StatYearly) => s.year === year) ?? [];
  }

  setStatsTotal() {
    this.displayStats = this.statsCarrer;
  }

  setStatsYear(year: number) {
    this.displayStats = this.statsYearly[year];
  }
}
