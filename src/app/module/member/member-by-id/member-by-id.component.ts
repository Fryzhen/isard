import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MemberService} from '../../../services/request-services/member.service';
import {Member} from '../../../services/request-services/iracing-entities';
import {Title} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {LoggerService} from '../../../services/app-services/logger.service';
import {NotificationService} from '../../../services/app-services/notification.service';
import {MemberInfoPanelComponent} from './member-info-panel/member-info-panel.component';
import {
  MemberParameters,
  MemberParameterPanelComponent
} from './member-parameter-panel/member-parameter-panel.component';
import {MemberLastRacesComponent} from './member-center-panel/member-last-races/member-last-races.component';
import {MemberStatsCareerComponent} from './member-center-panel/member-stats-career/member-stats-career.component';
import {MemberStatsYearlyComponent} from './member-center-panel/member-stats-yearly/member-stats-yearly.component';
import {LoadingScreenComponent} from '../../../components/loading-screen/loading-screen.component';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';
import {MemberAllRacesComponent} from './member-center-panel/member-all-races/member-all-races.component';
import {MemberCenterPanelComponent} from './member-center-panel/member-center-panel.component';

export enum MemberScreenDisplay {
  LastRaces,
  AllRaces,
  CareerStats,
  YearlyStats,
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
    LoadingScreenComponent,
    TranslatePipe,
    MemberCenterPanelComponent
  ],
})
export class MemberByIdComponent implements OnInit {
  isCharging = true;
  member?: Member = undefined;

  currentScreenDisplay: MemberScreenDisplay = MemberScreenDisplay.LastRaces;

  constructor(
    private route: ActivatedRoute,
    private memberService: MemberService,
    private loggerService: LoggerService,
    private notificationService: NotificationService,
    private titleService: Title,
    private translateService: TranslateService,
  ) {
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
        this.translateService.get('Member.MainPanel.Title').subscribe((text: string) => {
          this.titleService.setTitle(text + ' : ' + this.member?.display_name);
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

  setDisplay($event: MemberParameters): void {
    this.currentScreenDisplay = $event.screen
  }

  getParameters(): MemberParameters {
    return {
      screen: this.currentScreenDisplay
    } as MemberParameters
  }
}
