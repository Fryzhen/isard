import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MemberService} from '../../../services/request-services/member.service';
import {CareerStats, Member, Race, RecentRace, YearStats} from '../../../services/request-services/iracing-entities';
import {Title} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {LoggerService} from '../../../services/app-services/logger.service';
import {NotificationService} from '../../../services/app-services/notification.service';
import {MemberInfoPanelComponent} from './member-info-panel/member-info-panel.component';
import {
  MemberParameterPanel,
  MemberParameterPanelComponent
} from './member-parameter-panel/member-parameter-panel.component';
import {MemberLastRacesComponent} from './member-center-panel/member-last-races/member-last-races.component';
import {MemberStatsCareerComponent} from './member-center-panel/member-stats-career/member-stats-career.component';
import {MemberStatsYearlyComponent} from './member-center-panel/member-stats-yearly/member-stats-yearly.component';
import {LoadingScreenComponent} from '../../../components/loading-screen/loading-screen.component';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {StatsService} from '../../../services/request-services/stats.service';
import {MemberAllRacesComponent} from './member-center-panel/member-all-races/member-all-races.component';
import {ResultsService, SearchSeriesConfig} from '../../../services/request-services/results.service';

export enum MemberScreenDisplay {
  LastRaces,
  AllRaces,
  CareerStats,
  YearlyStats,
}

export interface CenterPanelRequest {
  allRaces: Race[] | undefined;
  lastRaces: RecentRace[] | undefined;
  careerStats: CareerStats[] | undefined;
  yearlyStats: YearStats[] | undefined;
}

@Component({
  standalone: true,
  selector: 'isard-lookup-driver',
  templateUrl: './member-by-id.component.html',
  styleUrls: ['./member-by-id.component.scss'],
  imports: [
    CommonModule,
    MemberInfoPanelComponent,
    MemberParameterPanelComponent,
    MemberLastRacesComponent,
    MemberStatsYearlyComponent,
    LoadingScreenComponent,
    TranslatePipe,
    MemberStatsCareerComponent,
    MemberAllRacesComponent
  ],
})
export class MemberByIdComponent implements OnInit {
  isCharging = true;
  member?: Member = undefined;
  centerPanelRequest: CenterPanelRequest;

  currentScreenDisplay: MemberScreenDisplay | undefined = MemberScreenDisplay.LastRaces;
  protected readonly MemberScreenDisplay = MemberScreenDisplay;

  constructor(
    private route: ActivatedRoute,
    private memberService: MemberService,
    private loggerService: LoggerService,
    private notificationService: NotificationService,
    private titleService: Title,
    private translateService: TranslateService,
    private statsService: StatsService,
    private resultService: ResultsService
  ) {
    this.centerPanelRequest = {
      lastRaces: undefined,
      yearlyStats: undefined,
      careerStats: undefined
    } as CenterPanelRequest;
  }

  ngOnInit(): void {
    this.route.params.subscribe(val => {
      this.isCharging = true;
      if (val['memberId']) {
        this.getMember(+val['memberId']);
      }
    });
  }

  getMember(memberId: number): void {
    this.memberService.getMember(memberId, true).subscribe({
      next: (member: Member) => {
        this.member = member;
        this.isCharging = false;
        this.setDisplay({screen: MemberScreenDisplay.LastRaces} as MemberParameterPanel);
        this.translateService.get('Member.MainPanel.Title').subscribe((text: string) => {
          this.titleService.setTitle(text + " : " + this.member?.display_name);
        });
      },
      error: error => {
        this.isCharging = false;
        this.loggerService.error(error);
        this.translateService.get('Member.Errors.MemberNotFoundTitle').subscribe((text: string) => {
          this.titleService.setTitle(text);
        });
        this.translateService.get('Member.Errors.MemberNotFound').subscribe((text: string) => {
          this.notificationService.error(text);
        });
      }
    });
  }

  setDisplay(parameters: MemberParameterPanel): void {
    this.currentScreenDisplay = parameters.screen;
    if (this.member?.cust_id) {
      if (parameters.screen === MemberScreenDisplay.LastRaces && this.centerPanelRequest.lastRaces === undefined) {
        this.getLastRaces(this.member?.cust_id);
      } else if (parameters.screen === MemberScreenDisplay.CareerStats && this.centerPanelRequest.careerStats === undefined) {
        this.getCareerStats(this.member?.cust_id);
      } else if (parameters.screen === MemberScreenDisplay.YearlyStats && this.centerPanelRequest.yearlyStats === undefined) {
        this.getYearlyStats(this.member?.cust_id);
      } else if (parameters.screen === MemberScreenDisplay.AllRaces && this.centerPanelRequest.allRaces === undefined) {
        this.getAllRaces(this.member?.cust_id, 2025, 2)
      }
    }
  }

  private getLastRaces(memberId: number) {
    this.statsService.getRecentRaces(memberId).subscribe({
      next: (races: RecentRace[]) => {
        this.centerPanelRequest.lastRaces = races;
      },
      error: (error: string) => {
        this.translateService.get('Components.NavBar.ImpossibleGetData').subscribe((text: string) => {
          this.notificationService.error(text);
        });
        this.loggerService.error(error);
      }
    });
  }

  private getCareerStats(memberId: number) {
    this.statsService.getCareerStats(memberId).subscribe({
      next: (stats: CareerStats[]) => {
        this.centerPanelRequest.careerStats = stats;
      },
      error: (error: string) => {
        this.translateService.get('Components.NavBar.ImpossibleGetData').subscribe((text: string) => {
          this.notificationService.error(text);
        });
        this.loggerService.error(error);
      }
    });
  }

  private getYearlyStats(memberId: number) {
    this.statsService.getYearlyStats(memberId).subscribe({
      next: (stats: YearStats[]) => {
        this.centerPanelRequest.yearlyStats = stats;
      },
      error: (error: string) => {
        this.translateService.get('Components.NavBar.ImpossibleGetData').subscribe((text: string) => {
          this.notificationService.error(text);
        });
        this.loggerService.error(error);
      }
    });
  }

  private getAllRaces(memberId: number, season_year: number, season_quarter: number, config?: SearchSeriesConfig) {
    this.resultService.searchSeries(memberId, season_year, season_quarter, config).subscribe({
      next: (races: Race[]) => {
        this.centerPanelRequest.allRaces = races;
      },
      error: (error: string) => {
        this.translateService.get('Components.NavBar.ImpossibleGetData').subscribe((text: string) => {
          this.notificationService.error(text);
        });
        this.loggerService.error(error);
      }
    })
  }
}
