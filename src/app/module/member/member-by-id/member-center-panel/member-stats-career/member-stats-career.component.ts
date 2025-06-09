import {Component, inject, Input, OnInit} from "@angular/core";
import {TranslatePipe, TranslateService} from "@ngx-translate/core";
import {BoxComponent} from "../../../../../components/box/box.component";
import {StatCarrer} from "../../../../../services/iracing-entities";
import {StatsTableComponent} from "../stats-table/stats-table.component";
import {LoggerService} from "../../../../../services/app-services/logger.service";
import {NotificationService} from "../../../../../services/app-services/notification.service";
import {StatsService} from "../../../../../services/request-services/stats.service";
import {LoadingScreenComponent} from "../../../../../components/loading-screen/loading-screen.component";

@Component({
  standalone: true,
  selector: "isard-member-stats-career",
  imports: [
    TranslatePipe,
    BoxComponent,
    StatsTableComponent,
    LoadingScreenComponent
  ],
  templateUrl: "./member-stats-career.component.html",
  styleUrl: "./member-stats-career.component.scss"
})
export class MemberStatsCareerComponent implements OnInit {
  @Input() cust_id!: number;
  stats?: StatCarrer[] = undefined;
  private readonly loggerService = inject(LoggerService);
  private readonly notificationService = inject(NotificationService);
  private readonly translateService = inject(TranslateService);
  private readonly statsService = inject(StatsService);

  ngOnInit(): void {
    this.statsService.getCareerStats(this.cust_id).subscribe({
      next: (stats: StatCarrer[]) => {
        this.stats = stats;
      },
      error: (error: string) => {
        this.notificationService.error(this.translateService.instant("Member.Errors.ImpossibleGetData"));
        this.loggerService.error(error);
      }
    });
  }
}
