import {Component, inject, Input, OnChanges} from "@angular/core";
import {MemberScreenDisplay} from "../member-by-id.component";
import {NgIf} from "@angular/common";
import {MemberStatsYearlyComponent} from "./member-stats-yearly/member-stats-yearly.component";
import {MemberAllRacesComponent} from "./member-all-races/member-all-races.component";
import {MemberStatsCareerComponent} from "./member-stats-career/member-stats-career.component";
import {MemberLastRacesComponent} from "./member-last-races/member-last-races.component";
import {CareerStats, Member, Race, RecentRace, YearStats} from "../../../../services/request-services/iracing-entities";
import {ResultsService, SearchSeriesConfig} from "../../../../services/request-services/results.service";
import {MemberParameters} from "../member-parameter-panel/member-parameter-panel.component";
import {StatsService} from "../../../../services/request-services/stats.service";
import {LoggerService} from "../../../../services/app-services/logger.service";
import {NotificationService} from "../../../../services/app-services/notification.service";
import {TranslateService} from "@ngx-translate/core";

export interface CenterPanelRequest {
  allRaces: Race[] | undefined;
  lastRaces: RecentRace[] | undefined;
  careerStats: CareerStats[] | undefined;
  yearlyStats: YearStats[] | undefined;
}

@Component({
  standalone: true,
  selector: "isard-member-center-panel",
  imports: [NgIf, MemberStatsYearlyComponent, MemberAllRacesComponent, MemberStatsCareerComponent, MemberLastRacesComponent],
  templateUrl: "./member-center-panel.component.html",
  styleUrl: "./member-center-panel.component.scss"
})
export class MemberCenterPanelComponent implements OnChanges {
  centerPanelRequest: CenterPanelRequest;
  @Input() member!: Member;
  @Input() parameters!: MemberParameters;
  protected readonly MemberScreenDisplay = MemberScreenDisplay;
  private readonly loggerService = inject(LoggerService);
  private readonly notificationService = inject(NotificationService);
  private readonly translateService = inject(TranslateService);
  private readonly statsService = inject(StatsService);
  private readonly resultService = inject(ResultsService);

  constructor() {
    this.centerPanelRequest = {} as CenterPanelRequest;
  }

  ngOnChanges(): void {
    this.setDisplay(this.parameters);
  }

  setDisplay(parameters: MemberParameters): void {
    if (this.member?.cust_id) {
      if (parameters.screen === MemberScreenDisplay.LastRaces && this.centerPanelRequest.lastRaces === undefined) {
        this.getLastRaces(this.member?.cust_id);
      } else if (parameters.screen === MemberScreenDisplay.CareerStats && this.centerPanelRequest.careerStats === undefined) {
        this.getCareerStats(this.member?.cust_id);
      } else if (parameters.screen === MemberScreenDisplay.YearlyStats && this.centerPanelRequest.yearlyStats === undefined) {
        this.getYearlyStats(this.member?.cust_id);
      } else if (parameters.screen === MemberScreenDisplay.AllRaces && this.centerPanelRequest.allRaces === undefined) {
        this.getAllRaces(this.member?.cust_id, 2025, 2);
      }
    }
  }

  private getLastRaces(memberId: number) {
    this.statsService.getRecentRaces(memberId).subscribe({
      next: (races: RecentRace[]) => {
        this.centerPanelRequest.lastRaces = races;
      }, error: (error: string) => {
        this.notificationService.error(this.translateService.instant("Components.NavBar.ImpossibleGetData"));
        this.loggerService.error(error);
      }
    });
  }

  private getCareerStats(memberId: number) {
    this.statsService.getCareerStats(memberId).subscribe({
      next: (stats: CareerStats[]) => {
        this.centerPanelRequest.careerStats = stats;
      }, error: (error: string) => {
        this.notificationService.error(this.translateService.instant("Components.NavBar.ImpossibleGetData"));
        this.loggerService.error(error);
      }
    });
  }

  private getYearlyStats(memberId: number) {
    this.statsService.getYearlyStats(memberId).subscribe({
      next: (stats: YearStats[]) => {
        this.centerPanelRequest.yearlyStats = stats;
      }, error: (error: string) => {
        this.notificationService.error(this.translateService.instant("Components.NavBar.ImpossibleGetData"));
        this.loggerService.error(error);
      }
    });
  }

  private getAllRaces(memberId: number, season_year: number, season_quarter: number, config?: SearchSeriesConfig) {
    this.resultService.searchSeries(memberId, season_year, season_quarter, config).subscribe({
      next: (races: Race[]) => {
        this.centerPanelRequest.allRaces = races;
      }, error: (error: string) => {
        this.notificationService.error(this.translateService.instant("Components.NavBar.ImpossibleGetData"));
        this.loggerService.error(error);
      }
    });
  }
}
