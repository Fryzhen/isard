import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MemberService} from '../../services/request-services/member.service';
import {Member} from '../../services/request-services/iracing-entities';
import {Title} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {LoggerService} from '../../services/app-services/logger.service';
import {NotificationService} from '../../services/app-services/notification.service';
import {MemberInfoPanelComponent} from './member-info-panel/member-info-panel.component';
import {MemberParameterPanelComponent} from './member-parameter-panel/member-parameter-panel.component';
import {MemberLastRacesComponent} from './member-center-panel/member-last-races/member-last-races.component';
import {MemberStatsCareerComponent} from './member-center-panel/member-stats-career/member-stats-career.component';
import {MemberStatsYearlyComponent} from './member-center-panel/member-stats-yearly/member-stats-yearly.component';
import {LoadingScreenComponent} from '../../components/loading-screen/loading-screen.component';
import {TranslatePipe, TranslateService} from '@ngx-translate/core';

export enum MemberScreenDisplay {
  LastRaces,
  AllRaces,
  CareerStats,
  YearlyStats,
}

@Component({
  standalone: true,
  selector: 'isard-lookup-driver',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss'],
  imports: [
    CommonModule,
    MemberInfoPanelComponent,
    MemberParameterPanelComponent,
    MemberLastRacesComponent,
    MemberStatsYearlyComponent,
    LoadingScreenComponent,
    TranslatePipe,
    MemberStatsCareerComponent
  ],
})
export class MemberComponent implements OnInit {
  member?: Member = undefined;
  isCharging = true;
  currentScreenDisplay: MemberScreenDisplay | undefined = MemberScreenDisplay.LastRaces;
  protected readonly MemberScreenDisplay = MemberScreenDisplay;

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
        this.memberService.getMember(+val['memberId'], true).subscribe({
          next: (member: Member) => {
            this.member = member;
            this.isCharging = false;
            this.currentScreenDisplay = MemberScreenDisplay.LastRaces;
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
    });
  }

  setDisplay(screen: MemberScreenDisplay): void {
    this.currentScreenDisplay = screen;
  }

}
